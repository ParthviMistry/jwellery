import React, { useEffect, useMemo, useRef, useState } from "react";
import { useFormik } from "formik";
import { PencilLine } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import CommonDialog from "@/components/common/CommonDialog";
import DataTable from "@/components/common/DataTable";
import DeleteDialog from "@/components/common/DeleteDialog";
import PageHeader from "@/components/common/PageHeader";
import SearchToolbar from "@/components/common/SearchToolbar";
import { useLoader } from "@/hooks/use-loader";
import { useToast } from "@/hooks/use-toast";
import {
  activateFinancialYear,
  createFinancialYear,
  deleteFinancialYear,
  getFinancialYears,
  updateFinancialYear,
} from "@/services/financialYears";
import { financialYearColumns } from "@/utils/constant";

const pageSize = 8;

const toDateInputValue = (value) => (value ? `${value}`.slice(0, 10) : "");

const FinancialYearPage = () => {
  const [financialYears, setFinancialYears] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [activatingId, setActivatingId] = useState(null);
  const [activeDialog, setActiveDialog] = useState(null);
  const [selectedFinancialYear, setSelectedFinancialYear] = useState(null);
  const nameInputRef = useRef(null);
  const { showLoader, hideLoader } = useLoader();
  const { showToasts } = useToast();

  const handleError = (error) => {
    showToasts("error", error?.message || "Something went wrong.", 5000, true);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      startDate: "",
      endDate: "",
      isActive: false,
    },
    validate: (values) => {
      const errors = {};
      if (!values.name.trim()) {
        errors.name = "Financial year name is required.";
      } else if (values.name.trim().length > 100) {
        errors.name = "Name cannot exceed 100 characters.";
      }
      if (!values.startDate) {
        errors.startDate = "Start date is required.";
      }
      if (!values.endDate) {
        errors.endDate = "End date is required.";
      } else if (values.startDate && values.endDate < values.startDate) {
        errors.endDate = "End date must be on or after the start date.";
      }
      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      const isEditing = Boolean(selectedFinancialYear);
      const payload = {
        name: values.name.trim(),
        startDate: `${values.startDate}T00:00:00`,
        endDate: `${values.endDate}T00:00:00`,
        isActive: values.isActive,
      };

      setSaving(true);
      showLoader(
        isEditing ? "Updating financial year" : "Creating financial year",
        "Please wait while the financial year is saved.",
        null,
        { scope: "dialog", blocking: true },
      );
      try {
        const financialYear = selectedFinancialYear
          ? await updateFinancialYear(selectedFinancialYear.id, payload)
          : await createFinancialYear(payload);

        setFinancialYears((previous) =>
          selectedFinancialYear
            ? previous.map((item) =>
                item.id === financialYear.id ? financialYear : item,
              )
            : [financialYear, ...previous],
        );
        setActiveDialog(null);
        setSelectedFinancialYear(null);
        resetForm();
        setPage(1);
        showToasts(
          "success",
          isEditing
            ? "Financial year updated successfully."
            : "Financial year created successfully.",
          3000,
        );
      } catch (saveError) {
        handleError(saveError);
      } finally {
        setSaving(false);
        hideLoader();
      }
    },
  });

  useEffect(() => {
    let active = true;

    const loadFinancialYears = async () => {
      setLoading(true);
      try {
        const result = await getFinancialYears();
        if (active) setFinancialYears(result);
      } catch (error) {
        if (active) handleError(error);
      } finally {
        if (active) setLoading(false);
      }
    };

    loadFinancialYears();
    return () => {
      active = false;
    };
  }, []);

  const filteredFinancialYears = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return financialYears;

    return financialYears.filter((financialYear) =>
      [financialYear.id, financialYear.name].some((value) =>
        `${value ?? ""}`.toLowerCase().includes(query),
      ),
    );
  }, [financialYears, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredFinancialYears.length / pageSize),
  );
  const currentPage = Math.min(page, totalPages);
  const visibleFinancialYears = filteredFinancialYears.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const openCreateDialog = () => {
    setSelectedFinancialYear(null);
    formik.resetForm({
      values: {
        name: "",
        startDate: "",
        endDate: "",
        isActive: false,
      },
    });
    setActiveDialog("form");
  };

  const openEditDialog = (financialYear) => {
    setSelectedFinancialYear(financialYear);
    formik.resetForm({
      values: {
        name: financialYear.name ?? "",
        startDate: toDateInputValue(financialYear.startDate),
        endDate: toDateInputValue(financialYear.endDate),
        isActive: Boolean(financialYear.isActive),
      },
    });
    setActiveDialog("form");
  };

  const handleActivate = async (financialYear) => {
    setActivatingId(financialYear.id);
    showLoader(
      "Activating financial year",
      `Switching the active financial year to ${financialYear.name}.`,
      null,
      { scope: "screen", blocking: true },
    );
    try {
      const activated = await activateFinancialYear(financialYear.id);
      setFinancialYears((previous) =>
        previous.map((item) => ({
          ...item,
          isActive: item.id === activated.id,
        })),
      );
      showToasts("success", "Financial year activated successfully.", 3000);
    } catch (error) {
      handleError(error);
    } finally {
      setActivatingId(null);
      hideLoader();
    }
  };

  const handleDelete = async () => {
    if (!selectedFinancialYear) return;

    setDeleting(true);
    showLoader(
      "Deleting financial year",
      "Please wait while the financial year is removed.",
      null,
      { scope: "dialog", blocking: true },
    );
    try {
      await deleteFinancialYear(selectedFinancialYear.id);
      setFinancialYears((previous) =>
        previous.filter((item) => item.id !== selectedFinancialYear.id),
      );
      setActiveDialog(null);
      setSelectedFinancialYear(null);
      showToasts("success", "Financial year deleted successfully.", 3000);
    } catch (error) {
      handleError(error);
    } finally {
      setDeleting(false);
      hideLoader();
    }
  };

  return (
    <div className="space-y-3">
      <PageHeader
        title="Financial Year"
        subtitle="Manage financial periods and select the active year."
      />

      <SearchToolbar
        value={search}
        onChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        onAdd={openCreateDialog}
        addLabel="Add financial year"
        disabled={loading || saving || activatingId !== null}
      />

      <DataTable
        rows={visibleFinancialYears}
        columns={financialYearColumns}
        page={currentPage}
        pageSize={pageSize}
        total={filteredFinancialYears.length}
        onPageChange={setPage}
        onEdit={openEditDialog}
        onDelete={(financialYear) => {
          setSelectedFinancialYear(financialYear);
          setActiveDialog("delete");
        }}
        onActivate={handleActivate}
        activateLabel="Activate financial year"
      />

      <CommonDialog
        openDialog={activeDialog === "form"}
        setOpenDialog={(open) => {
          if (!saving) setActiveDialog(open ? "form" : null);
        }}
        onClose={() => {
          formik.resetForm();
          setSelectedFinancialYear(null);
        }}
        disableClose={saving}
        header="Financial year settings"
        title={
          selectedFinancialYear ? "Edit financial year" : "Add financial year"
        }
        subheader="Set the period dates and financial year name."
        initialFocusRef={nameInputRef}
        content={
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4 py-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label
                  htmlFor="financial-year-name"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Name<span className="ml-1 text-destructive">*</span>
                </label>
                <Input
                  id="financial-year-name"
                  ref={nameInputRef}
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={Boolean(
                    formik.touched.name && formik.errors.name,
                  )}
                  placeholder="e.g. FY 2026-27"
                  maxLength={100}
                  disabled={saving}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="mt-1 text-sm text-destructive">
                    {formik.errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="financial-year-start-date"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Start Date<span className="ml-1 text-destructive">*</span>
                </label>
                <Input
                  id="financial-year-start-date"
                  type="date"
                  name="startDate"
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={Boolean(
                    formik.touched.startDate && formik.errors.startDate,
                  )}
                  disabled={saving}
                />
                {formik.touched.startDate && formik.errors.startDate && (
                  <p className="mt-1 text-sm text-destructive">
                    {formik.errors.startDate}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="financial-year-end-date"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  End Date<span className="ml-1 text-destructive">*</span>
                </label>
                <Input
                  id="financial-year-end-date"
                  type="date"
                  name="endDate"
                  value={formik.values.endDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={Boolean(
                    formik.touched.endDate && formik.errors.endDate,
                  )}
                  min={formik.values.startDate || undefined}
                  disabled={saving}
                />
                {formik.touched.endDate && formik.errors.endDate && (
                  <p className="mt-1 text-sm text-destructive">
                    {formik.errors.endDate}
                  </p>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={saving}
                onClick={() => {
                  setActiveDialog(null);
                  formik.resetForm();
                  setSelectedFinancialYear(null);
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={saving} className="gap-2">
                <PencilLine className="h-4 w-4" />
                {saving ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        }
      />

      <DeleteDialog
        open={activeDialog === "delete"}
        onOpenChange={(open) => {
          if (!deleting) setActiveDialog(open ? "delete" : null);
        }}
        onConfirm={handleDelete}
        itemName="financial year"
        description="This financial year will be removed from active records."
        confirmDisabled={deleting}
      />
    </div>
  );
};

export default FinancialYearPage;

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useFormik } from "formik";
import { PencilLine } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CommonDialog from "@/components/common/CommonDialog";
import DataTable from "@/components/common/DataTable";
import DeleteDialog from "@/components/common/DeleteDialog";
import PageHeader from "@/components/common/PageHeader";
import SearchToolbar from "@/components/common/SearchToolbar";
import { useLoader } from "@/hooks/use-loader";
import { useToast } from "@/hooks/use-toast";
import { getCountries } from "@/services/countries";
import {
  createState,
  deleteState,
  getStates,
  updateState,
} from "@/services/states";
import { stateColumns } from "@/utils/constant";

const pageSize = 8;

const StatePage = () => {
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [activeDialog, setActiveDialog] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  const stateNameInputRef = useRef(null);
  const { showLoader, hideLoader } = useLoader();
  const { showToasts } = useToast();

  const handleError = (error) => {
    showToasts("error", error?.message || "Something went wrong.", 5000, true);
  };

  const formik = useFormik({
    initialValues: { name: "", alias: "", countryId: "" },
    validate: (values) => {
      const errors = {};
      if (!values.name.trim()) {
        errors.name = "State name is required.";
      }
      if (!values.countryId) {
        errors.countryId = "Please select a country.";
      }
      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      const isEditing = Boolean(selectedState);
      const payload = {
        name: values.name.trim(),
        alias: values.alias.trim(),
        countryId: Number(values.countryId),
      };

      setSaving(true);
      showLoader(
        isEditing ? "Updating state" : "Creating state",
        "Please wait while the state is saved.",
        null,
        { scope: "dialog", blocking: true },
      );
      try {
        const state = selectedState
          ? await updateState(selectedState.id, payload)
          : await createState(payload);

        setStates((previous) =>
          selectedState
            ? previous.map((item) => (item.id === state.id ? state : item))
            : [state, ...previous],
        );
        setActiveDialog(null);
        setSelectedState(null);
        resetForm();
        setPage(1);
        showToasts(
          "success",
          isEditing
            ? "State updated successfully."
            : "State created successfully.",
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

    const loadStates = async () => {
      setLoading(true);
      try {
        const result = await getStates();
        if (active) setStates(result);
      } catch (error) {
        if (active) handleError(error);
      } finally {
        if (active) setLoading(false);
      }
    };

    const loadCountries = async () => {
      setCountriesLoading(true);
      try {
        const result = await getCountries();
        if (active) setCountries(result);
      } catch (error) {
        if (active) handleError(error);
      } finally {
        if (active) setCountriesLoading(false);
      }
    };

    loadStates();
    loadCountries();

    return () => {
      active = false;
    };
  }, []);

  const filteredStates = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return states;

    return states.filter((state) =>
      [state.id, state.name, state.alias, state.countryName].some((value) =>
        `${value ?? ""}`.toLowerCase().includes(query),
      ),
    );
  }, [states, search]);

  const totalPages = Math.max(1, Math.ceil(filteredStates.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleStates = filteredStates.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const openCreateDialog = () => {
    setSelectedState(null);
    formik.resetForm({ values: { name: "", alias: "", countryId: "" } });
    setActiveDialog("form");
  };

  const openEditDialog = (state) => {
    setSelectedState(state);
    formik.resetForm({
      values: {
        name: state.name ?? "",
        alias: state.alias ?? "",
        countryId: `${state.countryId ?? ""}`,
      },
    });
    setActiveDialog("form");
  };

  const handleDelete = async () => {
    if (!selectedState) return;

    setDeleting(true);
    showLoader(
      "Deleting state",
      "Please wait while the state is removed.",
      null,
      { scope: "dialog", blocking: true },
    );
    try {
      await deleteState(selectedState.id);
      setStates((previous) =>
        previous.filter((state) => state.id !== selectedState.id),
      );
      setActiveDialog(null);
      setSelectedState(null);
      showToasts("success", "State deleted successfully.", 3000);
    } catch (deleteError) {
      handleError(deleteError);
    } finally {
      setDeleting(false);
      hideLoader();
    }
  };

  return (
    <div className="space-y-3">
      <PageHeader
        title="State"
        subtitle="Manage state master values by country."
      />

      <SearchToolbar
        value={search}
        onChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        onAdd={openCreateDialog}
        addLabel="Add state"
        disabled={loading || saving}
      />

      <DataTable
        rows={visibleStates}
        columns={stateColumns}
        page={currentPage}
        pageSize={pageSize}
        total={filteredStates.length}
        onPageChange={setPage}
        onEdit={openEditDialog}
        onDelete={(state) => {
          setSelectedState(state);
          setActiveDialog("delete");
        }}
      />

      <CommonDialog
        openDialog={activeDialog === "form"}
        setOpenDialog={(open) => {
          if (!saving) setActiveDialog(open ? "form" : null);
        }}
        onClose={() => {
          formik.resetForm();
          setSelectedState(null);
        }}
        disableClose={saving}
        header="State master"
        title={selectedState ? "Edit state" : "Add state"}
        subheader="Enter the state name, alias, and its country."
        initialFocusRef={stateNameInputRef}
        content={
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4 py-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="state-name"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Name<span className="ml-1 text-destructive">*</span>
                </label>
                <Input
                  id="state-name"
                  ref={stateNameInputRef}
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={Boolean(
                    formik.touched.name && formik.errors.name,
                  )}
                  placeholder="e.g. Gujarat"
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="mt-1 text-sm text-destructive">
                    {formik.errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="state-alias"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Alias
                </label>
                <Input
                  id="state-alias"
                  name="alias"
                  value={formik.values.alias}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="e.g. GJ"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="state-country"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Country<span className="ml-1 text-destructive">*</span>
                </label>
                <Select
                  value={formik.values.countryId}
                  onValueChange={(value) =>
                    formik.setFieldValue("countryId", value)
                  }
                  onOpenChange={(open) => {
                    if (!open) formik.setFieldTouched("countryId", true);
                  }}
                  disabled={countriesLoading || saving}
                >
                  <SelectTrigger
                    id="state-country"
                    aria-invalid={Boolean(
                      formik.touched.countryId && formik.errors.countryId,
                    )}
                  >
                    <SelectValue
                      placeholder={
                        countriesLoading
                          ? "Loading countries..."
                          : "Select a country"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.id} value={`${country.id}`}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.countryId && formik.errors.countryId && (
                  <p className="mt-1 text-sm text-destructive">
                    {formik.errors.countryId}
                  </p>
                )}
                {!countriesLoading && countries.length === 0 && (
                  <p className="mt-1 text-sm text-destructive">
                    No countries are available. Add a country before creating a
                    state.
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
                  setSelectedState(null);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={saving || countries.length === 0}
                className="gap-2"
              >
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
        itemName="state"
        description="This state will be removed from active records."
        confirmDisabled={deleting}
      />
    </div>
  );
};

export default StatePage;

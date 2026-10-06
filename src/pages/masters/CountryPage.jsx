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
import { LoaderArea, useLoader } from "@/hooks/use-loader";
import { useToast } from "@/hooks/use-toast";

import {
  createCountry,
  deleteCountry,
  getCountries,
  updateCountry,
} from "@/services/countries";

import { countryColumns } from "@/utils/constant";

const pageSize = 8;

const CountryPage = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [activeDialog, setActiveDialog] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const countryNameInputRef = useRef(null);
  const previewTimeout = useRef(null);
  const { showLoader, hideLoader } = useLoader();
  const { showToasts } = useToast();

  useEffect(
    () => () => {
      window.clearTimeout(previewTimeout.current);
      hideLoader();
    },
    [hideLoader],
  );

  const previewLoader = (scope, blocking = true) => {
    window.clearTimeout(previewTimeout.current);
    if (scope === "dialog") {
      setSelectedCountry(null);
      formik.resetForm({
        values: { name: "", phoneCode: "", alias: "" },
      });
      setActiveDialog("form");
    }
    showLoader(
      `${scope[0].toUpperCase()}${scope.slice(1)} loader preview`,
      `${blocking ? "Blocking" : "Non-blocking"} preview closes in four seconds.`,
      null,
      { scope, blocking },
    );
    previewTimeout.current = window.setTimeout(hideLoader, 4000);
  };

  const handleError = (error) => {
    showToasts("error", error?.message || "Something went wrong.", 5000, true);
  };

  const handleSave = async (values, { resetForm }) => {
    const isEditing = Boolean(selectedCountry);
    const payload = {
      name: values.name.trim(),
      phoneCode: values.phoneCode.trim(),
      alias: values.alias.trim(),
    };

    setSaving(true);
    showLoader(
      isEditing ? "Updating country" : "Creating country",
      "Please wait while the country is saved.",
      null,
      { scope: "dialog", blocking: true },
    );
    try {
      const country = selectedCountry
        ? await updateCountry(selectedCountry.id, payload)
        : await createCountry(payload);

      setCountries((previous) =>
        selectedCountry
          ? previous.map((item) => (item.id === country.id ? country : item))
          : [country, ...previous],
      );
      setActiveDialog(null);
      setSelectedCountry(null);
      resetForm();
      setPage(1);
      showToasts(
        "success",
        isEditing
          ? "Country updated successfully."
          : "Country created successfully.",
        3000,
      );
    } catch (saveError) {
      handleError(saveError);
    } finally {
      setSaving(false);
      hideLoader();
    }
  };

  const formik = useFormik({
    initialValues: { name: "", phoneCode: "", alias: "" },
    validate: (values) => {
      const errors = {};
      if (!values.name.trim()) {
        errors.name = "Country name is required.";
      }
      if (!values.phoneCode.trim()) {
        errors.phoneCode = "Phone code is required.";
      } else if (!/^\d+$/.test(values.phoneCode.trim())) {
        errors.phoneCode = "Phone code must contain numbers only.";
      }
      if (!values.alias.trim()) {
        errors.alias = "Country alias is required.";
      }
      return errors;
    },
    onSubmit: handleSave,
  });

  useEffect(() => {
    const loadCountries = async () => {
      setLoading(true);
      try {
        setCountries(await getCountries());
      } catch (loadError) {
        handleError(loadError);
      } finally {
        setLoading(false);
      }
    };

    loadCountries();
  }, []);

  const filteredCountries = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return countries;

    return countries.filter((country) =>
      Object.values(country).some((value) =>
        `${value ?? ""}`.toLowerCase().includes(query),
      ),
    );
  }, [countries, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCountries.length / pageSize),
  );
  const currentPage = Math.min(page, totalPages);
  const visibleCountries = filteredCountries.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const openCreateDialog = () => {
    setSelectedCountry(null);
    formik.resetForm({ values: { name: "", phoneCode: "", alias: "" } });
    setActiveDialog("form");
  };

  const openEditDialog = (country) => {
    setSelectedCountry(country);
    formik.resetForm({
      values: {
        name: country.name ?? "",
        phoneCode: country.phoneCode ?? "",
        alias: country.alias ?? "",
      },
    });
    setActiveDialog("form");
  };

  const handleDelete = async () => {
    if (!selectedCountry) return;

    setDeleting(true);
    showLoader(
      "Deleting country",
      "Please wait while the country is removed.",
      null,
      { scope: "dialog", blocking: true },
    );
    try {
      await deleteCountry(selectedCountry.id);
      setCountries((previous) =>
        previous.filter((country) => country.id !== selectedCountry.id),
      );
      setActiveDialog(null);
      setSelectedCountry(null);
      showToasts("success", "Country deleted successfully.", 3000);
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
        title="Country"
        subtitle="Maintain global country master data."
        action={
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => previewLoader("screen")}
            >
              Preview full screen
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => previewLoader("outlet")}
            >
              Preview outlet
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => previewLoader("dialog")}
            >
              Preview dialog
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => previewLoader("outlet", false)}
            >
              Preview non-blocking
            </Button>
          </div>
        }
      />

      <SearchToolbar
        value={search}
        onChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        onAdd={openCreateDialog}
        addLabel="Add country"
        disabled={loading || saving}
      />

      {/* <LoaderArea
        loading={loading}
        title="Loading countries"
        subheader="Please wait while country data is loaded."
      > */}
      <DataTable
        rows={visibleCountries}
        columns={countryColumns}
        page={currentPage}
        pageSize={pageSize}
        total={filteredCountries.length}
        onPageChange={setPage}
        onEdit={openEditDialog}
        onDelete={(country) => {
          setSelectedCountry(country);
          setActiveDialog("delete");
        }}
      />
      {/* </LoaderArea> */}

      <CommonDialog
        openDialog={activeDialog === "form"}
        setOpenDialog={(open) => {
          if (!saving) setActiveDialog(open ? "form" : null);
        }}
        onClose={() => {
          formik.resetForm();
          setSelectedCountry(null);
        }}
        disableClose={saving}
        header="Country master"
        title={selectedCountry ? "Edit country" : "Add country"}
        subheader="Enter the country name, phone code, and alias."
        initialFocusRef={countryNameInputRef}
        content={
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4 py-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="country-name"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Name<span className="ml-1 text-destructive">*</span>
                </label>
                <Input
                  id="country-name"
                  ref={countryNameInputRef}
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={Boolean(
                    formik.touched.name && formik.errors.name,
                  )}
                  placeholder="e.g. India"
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="mt-1 text-sm text-destructive">
                    {formik.errors.name}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="country-phone-code"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Phone Code<span className="ml-1 text-destructive">*</span>
                </label>
                <Input
                  id="country-phone-code"
                  type="text"
                  inputMode="numeric"
                  name="phoneCode"
                  value={formik.values.phoneCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={Boolean(
                    formik.touched.phoneCode && formik.errors.phoneCode,
                  )}
                  placeholder="e.g. 91"
                />
                {formik.touched.phoneCode && formik.errors.phoneCode && (
                  <p className="mt-1 text-sm text-destructive">
                    {formik.errors.phoneCode}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="country-alias"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Alias<span className="ml-1 text-destructive">*</span>
                </label>
                <Input
                  id="country-alias"
                  name="alias"
                  value={formik.values.alias}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={Boolean(
                    formik.touched.alias && formik.errors.alias,
                  )}
                  placeholder="e.g. US-XX"
                />
                {formik.touched.alias && formik.errors.alias && (
                  <p className="mt-1 text-sm text-destructive">
                    {formik.errors.alias}
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
                  setSelectedCountry(null);
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
        itemName="country"
        description="This country will be removed from active records."
        confirmDisabled={deleting}
      />
    </div>
  );
};

export default CountryPage;

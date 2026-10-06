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
import {
  createCity,
  deleteCity,
  getCities,
  updateCity,
} from "@/services/cities";
import { getStates } from "@/services/states";
import { cityColumns } from "@/utils/constant";

const pageSize = 8;

const CityPage = () => {
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [statesLoading, setStatesLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [activeDialog, setActiveDialog] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const cityNameInputRef = useRef(null);
  const { showLoader, hideLoader } = useLoader();
  const { showToasts } = useToast();

  const handleError = (error) => {
    showToasts("error", error?.message || "Something went wrong.", 5000, true);
  };

  const formik = useFormik({
    initialValues: { name: "", stateId: "" },
    validate: (values) => {
      const errors = {};
      if (!values.name.trim()) {
        errors.name = "City name is required.";
      } else if (values.name.trim().length > 100) {
        errors.name = "City name cannot exceed 100 characters.";
      }
      if (!values.stateId) {
        errors.stateId = "Please select a state.";
      }
      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      const isEditing = Boolean(selectedCity);
      const payload = {
        name: values.name.trim(),
        stateId: Number(values.stateId),
      };

      setSaving(true);
      showLoader(
        isEditing ? "Updating city" : "Creating city",
        "Please wait while the city is saved.",
        null,
        { scope: "dialog", blocking: true },
      );
      try {
        const city = selectedCity
          ? await updateCity(selectedCity.id, payload)
          : await createCity(payload);

        setCities((previous) =>
          selectedCity
            ? previous.map((item) => (item.id === city.id ? city : item))
            : [city, ...previous],
        );
        setActiveDialog(null);
        setSelectedCity(null);
        resetForm();
        setPage(1);
        showToasts(
          "success",
          isEditing
            ? "City updated successfully."
            : "City created successfully.",
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

    const loadCities = async () => {
      setLoading(true);
      try {
        const result = await getCities();
        if (active) setCities(result);
      } catch (error) {
        if (active) handleError(error);
      } finally {
        if (active) setLoading(false);
      }
    };

    const loadStates = async () => {
      setStatesLoading(true);
      try {
        const result = await getStates();
        if (active) setStates(result);
      } catch (error) {
        if (active) handleError(error);
      } finally {
        if (active) setStatesLoading(false);
      }
    };

    loadCities();
    loadStates();

    return () => {
      active = false;
    };
  }, []);

  const filteredCities = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return cities;

    return cities.filter((city) =>
      [city.id, city.name, city.stateName, city.countryName].some((value) =>
        `${value ?? ""}`.toLowerCase().includes(query),
      ),
    );
  }, [cities, search]);

  const totalPages = Math.max(1, Math.ceil(filteredCities.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleCities = filteredCities.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const openCreateDialog = () => {
    setSelectedCity(null);
    formik.resetForm({ values: { name: "", stateId: "" } });
    setActiveDialog("form");
  };

  const openEditDialog = (city) => {
    setSelectedCity(city);
    formik.resetForm({
      values: {
        name: city.name ?? "",
        stateId: `${city.stateId ?? ""}`,
      },
    });
    setActiveDialog("form");
  };

  const handleDelete = async () => {
    if (!selectedCity) return;

    setDeleting(true);
    showLoader(
      "Deleting city",
      "Please wait while the city is removed.",
      null,
      { scope: "dialog", blocking: true },
    );
    try {
      await deleteCity(selectedCity.id);
      setCities((previous) =>
        previous.filter((city) => city.id !== selectedCity.id),
      );
      setActiveDialog(null);
      setSelectedCity(null);
      showToasts("success", "City deleted successfully.", 3000);
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
        title="City"
        subtitle="Manage city and area master records."
      />

      <SearchToolbar
        value={search}
        onChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        onAdd={openCreateDialog}
        addLabel="Add city"
        disabled={loading || saving}
      />

      <DataTable
        rows={visibleCities}
        columns={cityColumns}
        page={currentPage}
        pageSize={pageSize}
        total={filteredCities.length}
        onPageChange={setPage}
        onEdit={openEditDialog}
        onDelete={(city) => {
          setSelectedCity(city);
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
          setSelectedCity(null);
        }}
        disableClose={saving}
        header="City master"
        title={selectedCity ? "Edit city" : "Add city"}
        subheader="Enter the city name and select its state."
        initialFocusRef={cityNameInputRef}
        content={
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4 py-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="city-name"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Name<span className="ml-1 text-destructive">*</span>
                </label>
                <Input
                  id="city-name"
                  ref={cityNameInputRef}
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={Boolean(
                    formik.touched.name && formik.errors.name,
                  )}
                  placeholder="e.g. Surat"
                  maxLength={100}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="mt-1 text-sm text-destructive">
                    {formik.errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="city-state"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  State<span className="ml-1 text-destructive">*</span>
                </label>
                <Select
                  value={formik.values.stateId}
                  onValueChange={(value) =>
                    formik.setFieldValue("stateId", value)
                  }
                  onOpenChange={(open) => {
                    if (!open) formik.setFieldTouched("stateId", true);
                  }}
                  disabled={statesLoading || saving}
                >
                  <SelectTrigger
                    id="city-state"
                    aria-invalid={Boolean(
                      formik.touched.stateId && formik.errors.stateId,
                    )}
                  >
                    <SelectValue
                      placeholder={
                        statesLoading ? "Loading states..." : "Select a state"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state.id} value={`${state.id}`}>
                        {state.name}
                        {state.countryName ? ` (${state.countryName})` : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.stateId && formik.errors.stateId && (
                  <p className="mt-1 text-sm text-destructive">
                    {formik.errors.stateId}
                  </p>
                )}
                {!statesLoading && states.length === 0 && (
                  <p className="mt-1 text-sm text-destructive">
                    No states are available. Add a state before creating a city.
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
                  setSelectedCity(null);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={saving || states.length === 0}
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
        itemName="city"
        description="This city will be removed from active records."
        confirmDisabled={deleting}
      />
    </div>
  );
};

export default CityPage;

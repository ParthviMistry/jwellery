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
  createShape,
  deleteShape,
  getShapes,
  updateShape,
} from "@/services/shapes";
import { shapeColumns } from "@/utils/constant";

const pageSize = 8;

const ShapePage = () => {
  const [shapes, setShapes] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [activeDialog, setActiveDialog] = useState(null);
  const [selectedShape, setSelectedShape] = useState(null);
  const nameInputRef = useRef(null);
  const { showLoader, hideLoader } = useLoader();
  const { showToasts } = useToast();

  const handleError = (error) => {
    showToasts("error", error?.message || "Something went wrong.", 5000, true);
  };

  const formik = useFormik({
    initialValues: { name: "", imgPath: "" },
    validate: (values) => {
      const errors = {};
      if (!values.name.trim()) {
        errors.name = "Shape name is required.";
      } else if (values.name.trim().length > 100) {
        errors.name = "Shape name cannot exceed 100 characters.";
      }
      if (values.imgPath.trim().length > 1000) {
        errors.imgPath = "Image path cannot exceed 1000 characters.";
      }
      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      const isEditing = Boolean(selectedShape);
      const payload = {
        name: values.name.trim(),
        imgPath: values.imgPath.trim() || null,
      };

      setSaving(true);
      showLoader(
        isEditing ? "Updating shape" : "Creating shape",
        "Please wait while the shape is saved.",
        null,
        { scope: "dialog", blocking: true },
      );
      try {
        const shape = selectedShape
          ? await updateShape(selectedShape.id, payload)
          : await createShape(payload);

        setShapes((previous) =>
          selectedShape
            ? previous.map((item) => (item.id === shape.id ? shape : item))
            : [shape, ...previous],
        );
        setActiveDialog(null);
        setSelectedShape(null);
        resetForm();
        setPage(1);
        showToasts(
          "success",
          isEditing
            ? "Shape updated successfully."
            : "Shape created successfully.",
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

    const loadShapes = async () => {
      setLoading(true);
      try {
        const result = await getShapes();
        if (active) setShapes(result);
      } catch (error) {
        if (active) handleError(error);
      } finally {
        if (active) setLoading(false);
      }
    };

    loadShapes();
    return () => {
      active = false;
    };
  }, []);

  const filteredShapes = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return shapes;

    return shapes.filter((shape) =>
      [shape.id, shape.name, shape.imgPath].some((value) =>
        `${value ?? ""}`.toLowerCase().includes(query),
      ),
    );
  }, [shapes, search]);

  const totalPages = Math.max(1, Math.ceil(filteredShapes.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleShapes = filteredShapes.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const openCreateDialog = () => {
    setSelectedShape(null);
    formik.resetForm({ values: { name: "", imgPath: "" } });
    setActiveDialog("form");
  };

  const openEditDialog = (shape) => {
    setSelectedShape(shape);
    formik.resetForm({
      values: {
        name: shape.name ?? "",
        imgPath: shape.imgPath ?? "",
      },
    });
    setActiveDialog("form");
  };

  const handleDelete = async () => {
    if (!selectedShape) return;

    setDeleting(true);
    showLoader(
      "Deleting shape",
      "Please wait while the shape is removed.",
      null,
      { scope: "dialog", blocking: true },
    );
    try {
      await deleteShape(selectedShape.id);
      setShapes((previous) =>
        previous.filter((shape) => shape.id !== selectedShape.id),
      );
      setActiveDialog(null);
      setSelectedShape(null);
      showToasts("success", "Shape deleted successfully.", 3000);
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
        title="Shape Master"
        subtitle="Manage stone and gemstone shape master data."
      />

      <SearchToolbar
        value={search}
        onChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        onAdd={openCreateDialog}
        addLabel="Add shape"
        disabled={loading || saving}
      />

      <DataTable
        rows={visibleShapes}
        columns={shapeColumns}
        page={currentPage}
        pageSize={pageSize}
        total={filteredShapes.length}
        onPageChange={setPage}
        onEdit={openEditDialog}
        onDelete={(shape) => {
          setSelectedShape(shape);
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
          setSelectedShape(null);
        }}
        disableClose={saving}
        header="Shape master"
        title={selectedShape ? "Edit shape" : "Add shape"}
        subheader="Enter the shape name and optional image path."
        initialFocusRef={nameInputRef}
        content={
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4 py-4">
              <div>
                <label
                  htmlFor="shape-name"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Name<span className="ml-1 text-destructive">*</span>
                </label>
                <Input
                  id="shape-name"
                  ref={nameInputRef}
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={Boolean(
                    formik.touched.name && formik.errors.name,
                  )}
                  placeholder="e.g. Round"
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
                  htmlFor="shape-img-path"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Image Path
                </label>
                <Input
                  id="shape-img-path"
                  name="imgPath"
                  value={formik.values.imgPath}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={Boolean(
                    formik.touched.imgPath && formik.errors.imgPath,
                  )}
                  placeholder="https://example.com/shape-round.png"
                  maxLength={1000}
                  disabled={saving}
                />
                {formik.touched.imgPath && formik.errors.imgPath && (
                  <p className="mt-1 text-sm text-destructive">
                    {formik.errors.imgPath}
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
                  setSelectedShape(null);
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
        itemName="shape"
        description="This shape will be removed from active records."
        confirmDisabled={deleting}
      />
    </div>
  );
};

export default ShapePage;

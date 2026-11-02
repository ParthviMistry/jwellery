import React, { useEffect, useMemo, useRef, useState } from "react";
import { useFormik } from "formik";
import { ArrowLeft, PencilLine } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DataTable from "@/components/common/DataTable";
import DeleteDialog from "@/components/common/DeleteDialog";
import PageHeader from "@/components/common/PageHeader";
import SearchToolbar from "@/components/common/SearchToolbar";
import { useLoader } from "@/hooks/use-loader";
import { useToast } from "@/hooks/use-toast";
import { getShapes } from "@/services/shapes";
import {
  createStone,
  deleteStone,
  getStones,
  updateStone,
} from "@/services/stones";
import {
  stoneColumns,
  stoneDecimalFields,
  stoneEnumOptions,
  stoneNonNegativeDecimalFields,
  stonePageSize,
  stoneTextFields,
  stoneToForm,
} from "@/utils/constant";

const splitLines = (value) =>
  value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

const toOptionalNumber = (value) => (value === "" ? null : Number(value));

const normalizeArray = (values) =>
  (values ?? []).map((value) => value.trim()).filter(Boolean);

const sameValues = (left, right) => {
  const normalizedLeft = normalizeArray(left);
  const normalizedRight = normalizeArray(right);
  return (
    normalizedLeft.length === normalizedRight.length &&
    normalizedLeft.every((value, index) => value === normalizedRight[index])
  );
};

const createMediaInput = (links, paths) => {
  const mediaLink = splitLines(links);
  const mediaPath = splitLines(paths);
  return mediaLink.length || mediaPath.length ? { mediaLink, mediaPath } : null;
};

const MediaPreview = ({ type, src }) => {
  const [failed, setFailed] = useState(false);

  if (!src) return null;

  let previewUrl;
  try {
    const url = new URL(src, window.location.origin);
    if (url.protocol === "http:" || url.protocol === "https:") {
      previewUrl = url.href;
    }
  } catch {
    return null;
  }

  if (!previewUrl) return null;

  return (
    <div className="space-y-2 rounded-md border border-border p-3">
      {failed ? (
        <p className="text-sm text-muted-foreground">
          Preview unavailable.{" "}
          <a
            href={previewUrl}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-primary underline"
          >
            Open media link
          </a>
        </p>
      ) : type === "image" ? (
        <img
          src={previewUrl}
          alt="Product image preview"
          onError={() => setFailed(true)}
          className="max-h-56 max-w-full rounded object-contain"
        />
      ) : (
        <video
          src={previewUrl}
          controls
          preload="metadata"
          onError={() => setFailed(true)}
          className="max-h-56 w-full rounded"
        >
          Your browser does not support video previews.
        </video>
      )}
      {!failed && (
        <a
          href={previewUrl}
          target="_blank"
          rel="noreferrer"
          className="block truncate text-xs text-muted-foreground underline"
        >
          {src}
        </a>
      )}
    </div>
  );
};

const StonePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id: editStoneId } = useParams();
  const isAddPage = location.pathname === "/stone/stone-master/add-stone";
  const isEditPage = Boolean(editStoneId);
  const isFormPage = isAddPage || isEditPage;
  const [stones, setStones] = useState([]);
  const [shapes, setShapes] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [activeDialog, setActiveDialog] = useState(null);
  const [selectedStone, setSelectedStone] = useState(null);
  const stockIdInputRef = useRef(null);
  const { showLoader, hideLoader } = useLoader();
  const { showToasts } = useToast();

  const handleError = (error) => {
    showToasts("error", error?.message || "Something went wrong.", 5000, true);
  };

  const joinLines = (values) =>
    Array.isArray(values) ? values.join("\n") : "";

  const stoneToForm = (stone) => ({
    ...emptyStoneForm,
    ...Object.fromEntries([
      ...stoneTextFields.map(([key]) => [key, stone[key] ?? ""]),
      ...stoneDecimalFields.map(([key]) => [
        key,
        stone[key] === null || stone[key] === undefined ? "" : `${stone[key]}`,
      ]),
    ]),
    shapeId: `${stone.shapeId ?? ""}`,
    colorType: stone.colorType ?? "White",
    clarity: stone.clarity ?? "IF",
    growthType: stone.growthType ?? "Natural",
    isAvailable: Boolean(stone.isAvailable),
    description: stone.description ?? "",
    productImgLinks: joinLines(stone.productImg?.mediaLink),
    productImgPaths: joinLines(stone.productImg?.mediaPath),
    productVideoLinks: joinLines(stone.productVideo?.mediaLink),
    productVideoPaths: joinLines(stone.productVideo?.mediaPath),
  });

  const formik = useFormik({
    initialValues: emptyStoneForm,
    validate: (values) => {
      const errors = {};
      if (!values.stoneType.trim()) {
        errors.stoneType = "Stone type is required.";
      } else if (values.stoneType.trim().length > 100) {
        errors.stoneType = "Stone type cannot exceed 100 characters.";
      }
      if (!values.stockId.trim()) {
        errors.stockId = "Stock ID is required.";
      } else if (values.stockId.trim().length > 100) {
        errors.stockId = "Stock ID cannot exceed 100 characters.";
      }
      if (!values.shapeId) errors.shapeId = "Select a shape.";

      const colorCodeOptions =
        values.colorType === "White"
          ? stoneEnumOptions.whiteColorCode
          : stoneEnumOptions.fancyColorCode;
      if (!values.colorCode) {
        errors.colorCode = `${
          values.colorType === "White" ? "White" : "Fancy"
        } Color Code is required.`;
      } else if (!colorCodeOptions.includes(values.colorCode)) {
        errors.colorCode = "Select a valid color code.";
      }
      if (values.colorType === "Fancy") {
        if (!values.overtone) {
          errors.overtone = "Fancy Overtone is required.";
        } else if (!stoneEnumOptions.fancyOvertone.includes(values.overtone)) {
          errors.overtone = "Select a valid fancy overtone.";
        }
        if (!values.intensity) {
          errors.intensity = "Fancy Intensity is required.";
        } else if (
          !stoneEnumOptions.fancyIntensity.includes(values.intensity)
        ) {
          errors.intensity = "Select a valid fancy intensity.";
        }
      }

      stoneDecimalFields.forEach(([key, label, required]) => {
        const value = values[key];
        if (required && value === "") {
          errors[key] = `${label} is required.`;
        } else if (
          value !== "" &&
          (!Number.isFinite(Number(value)) ||
            (stoneNonNegativeDecimalFields.has(key) && Number(value) < 0))
        ) {
          errors[key] = `${label} must be a valid number${
            stoneNonNegativeDecimalFields.has(key) ? " zero or greater" : ""
          }.`;
        }
      });
      stoneTextFields.forEach(([key, label, maxLength]) => {
        if (values[key].length > maxLength) {
          errors[key] = `${label} cannot exceed ${maxLength} characters.`;
        }
      });
      if (values.description.length > 4000) {
        errors.description = "Description cannot exceed 4000 characters.";
      }
      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      const isEditing = Boolean(selectedStone);
      const payload = {
        stoneType: values.stoneType.trim(),
        stockId: values.stockId.trim(),
        lab: values.lab.trim() || null,
        report: values.report.trim() || null,
        shapeId: Number(values.shapeId),
        carat: Number(values.carat),
        colorType: values.colorType,
        colorCode: values.colorCode || null,
        overtone: values.colorType === "Fancy" ? values.overtone || null : null,
        intensity:
          values.colorType === "Fancy" ? values.intensity || null : null,
        clarity: values.clarity,
        cut: values.cut.trim() || null,
        polish: values.polish.trim() || null,
        symmetry: values.symmetry.trim() || null,
        fluorescence: values.fluorescence.trim() || null,
        table: toOptionalNumber(values.table),
        depth: toOptionalNumber(values.depth),
        ratio: toOptionalNumber(values.ratio),
        length: toOptionalNumber(values.length),
        width: toOptionalNumber(values.width),
        rapo: toOptionalNumber(values.rapo),
        percent: toOptionalNumber(values.percent),
        total: toOptionalNumber(values.total),
        certificateLink: values.certificateLink.trim() || null,
        crownAngle: toOptionalNumber(values.crownAngle),
        crownHeight: toOptionalNumber(values.crownHeight),
        pavilionAngle: toOptionalNumber(values.pavilionAngle),
        pavilionHeight: toOptionalNumber(values.pavilionHeight),
        culetSize: values.culetSize.trim() || null,
        girdleName: values.girdleName.trim() || null,
        girdlePercentage: toOptionalNumber(values.girdlePercentage),
        growthType: values.growthType,
        description: values.description.trim() || null,
        isAvailable: values.isAvailable,
      };

      const imageInput = createMediaInput(
        values.productImgLinks,
        values.productImgPaths,
      );
      const videoInput = createMediaInput(
        values.productVideoLinks,
        values.productVideoPaths,
      );

      if (!selectedStone) {
        payload.productImg = imageInput;
        payload.productVideo = videoInput;
      } else {
        const existingImage = selectedStone.productImg;
        const existingVideo = selectedStone.productVideo;
        const imageUnchanged =
          existingImage &&
          sameValues(imageInput?.mediaLink, existingImage.mediaLink) &&
          sameValues(imageInput?.mediaPath, existingImage.mediaPath);
        const videoUnchanged =
          existingVideo &&
          sameValues(videoInput?.mediaLink, existingVideo.mediaLink) &&
          sameValues(videoInput?.mediaPath, existingVideo.mediaPath);

        if (imageInput && !imageUnchanged) payload.productImg = imageInput;
        if (videoInput && !videoUnchanged) payload.productVideo = videoInput;
        if (existingImage && !imageInput) payload.removeProductImg = true;
        if (existingVideo && !videoInput) payload.removeProductVideo = true;
      }

      setSaving(true);
      showLoader(
        isEditing ? "Updating stone" : "Creating stone",
        "Please wait while the stone record is saved.",
        null,
        { scope: "dialog", blocking: true },
      );
      try {
        const stone = selectedStone
          ? await updateStone(selectedStone.id, payload)
          : await createStone(payload);

        setStones((previous) =>
          selectedStone
            ? previous.map((item) => (item.id === stone.id ? stone : item))
            : [stone, ...previous],
        );
        setActiveDialog(null);
        setSelectedStone(null);
        resetForm({ values: emptyStoneForm });
        setPage(1);
        if (isFormPage) navigate("/stone/stone-master");
        showToasts(
          "success",
          isEditing
            ? "Stone updated successfully."
            : "Stone created successfully.",
          3000,
        );
      } catch (error) {
        handleError(error);
      } finally {
        setSaving(false);
        hideLoader();
      }
    },
  });

  useEffect(() => {
    let active = true;
    const loadPageData = async () => {
      setLoading(true);
      try {
        const [stoneResults, shapeResults] = await Promise.all([
          getStones(),
          getShapes(),
        ]);
        if (active) {
          setStones(stoneResults);
          setShapes(shapeResults);
        }
      } catch (error) {
        if (active) handleError(error);
      } finally {
        if (active) setLoading(false);
      }
    };

    loadPageData();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!isEditPage || loading) return;

    const stone = stones.find((item) => `${item.id}` === editStoneId);
    if (!stone) {
      handleError(new Error("Stone not found."));
      navigate("/stone/stone-master", { replace: true });
      return;
    }

    setSelectedStone(stone);
    formik.resetForm({ values: stoneToForm(stone) });
  }, [editStoneId, formik.resetForm, isEditPage, loading, navigate, stones]);

  const filteredStones = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return stones;
    return stones.filter((stone) =>
      [
        stone.id,
        stone.stockId,
        stone.stoneType,
        stone.shapeName,
        stone.lab,
        stone.report,
        stone.colorType,
        stone.colorCode,
        stone.clarity,
        stone.growthType,
      ].some((value) => `${value ?? ""}`.toLowerCase().includes(query)),
    );
  }, [stones, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredStones.length / stonePageSize),
  );
  const currentPage = Math.min(page, totalPages);
  const visibleStones = filteredStones.slice(
    (currentPage - 1) * stonePageSize,
    currentPage * stonePageSize,
  );

  const openCreatePage = () => {
    setSelectedStone(null);
    formik.resetForm({ values: emptyStoneForm });
    navigate("/stone/stone-master/add-stone");
  };

  const openEditPage = (stone) => {
    setSelectedStone(stone);
    formik.resetForm({ values: stoneToForm(stone) });
    navigate(`/stone/stone-master/edit-stone/${stone.id}`);
  };

  const handleDelete = async () => {
    if (!selectedStone) return;
    setDeleting(true);
    showLoader(
      "Deleting stone",
      "Please wait while the stone record is removed.",
      null,
      { scope: "dialog", blocking: true },
    );
    try {
      await deleteStone(selectedStone.id);
      setStones((previous) =>
        previous.filter((stone) => stone.id !== selectedStone.id),
      );
      setActiveDialog(null);
      setSelectedStone(null);
      showToasts("success", "Stone deleted successfully.", 3000);
    } catch (error) {
      handleError(error);
    } finally {
      setDeleting(false);
      hideLoader();
    }
  };

  const handleCancelForm = () => {
    formik.resetForm({ values: emptyStoneForm });
    setSelectedStone(null);
    navigate("/stone/stone-master");
  };

  const renderTextField = (key, label, maxLength, required = false) => (
    <div key={key}>
      <label
        htmlFor={`stone-${key}`}
        className="mb-1.5 block text-sm font-medium text-foreground"
      >
        {label}
        {required && <span className="ml-1 text-destructive">*</span>}
      </label>
      <Input
        id={`stone-${key}`}
        ref={key === "stockId" ? stockIdInputRef : undefined}
        name={key}
        value={formik.values[key]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        maxLength={maxLength}
        disabled={saving}
        aria-invalid={Boolean(formik.touched[key] && formik.errors[key])}
      />
      {formik.touched[key] && formik.errors[key] && (
        <p className="mt-1 text-sm text-destructive">{formik.errors[key]}</p>
      )}
    </div>
  );

  const renderDecimalField = ([key, label, required]) => (
    <div key={key}>
      <label
        htmlFor={`stone-${key}`}
        className="mb-1.5 block text-sm font-medium text-foreground"
      >
        {label}
        {required && <span className="ml-1 text-destructive">*</span>}
      </label>
      <Input
        id={`stone-${key}`}
        name={key}
        type="number"
        min={stoneNonNegativeDecimalFields.has(key) ? "0" : undefined}
        step="any"
        value={formik.values[key]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={saving}
        aria-invalid={Boolean(formik.touched[key] && formik.errors[key])}
      />
      {formik.touched[key] && formik.errors[key] && (
        <p className="mt-1 text-sm text-destructive">{formik.errors[key]}</p>
      )}
    </div>
  );

  const renderEnumSelect = (key, label, options) => (
    <div key={key}>
      <label
        htmlFor={`stone-${key}`}
        className="mb-1.5 block text-sm font-medium text-foreground"
      >
        {label}
        <span className="ml-1 text-destructive">*</span>
      </label>
      <Select
        value={formik.values[key]}
        onValueChange={(value) => {
          formik.setFieldValue(key, value);
          formik.setFieldTouched(key, true, false);
        }}
        disabled={saving}
      >
        <SelectTrigger
          id={`stone-${key}`}
          aria-invalid={Boolean(
            (formik.touched[key] || formik.submitCount > 0) &&
            formik.errors[key],
          )}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {(formik.touched[key] || formik.submitCount > 0) &&
        formik.errors[key] && (
          <p className="mt-1 text-sm text-destructive">{formik.errors[key]}</p>
        )}
    </div>
  );

  const handleColorTypeChange = (colorType) => {
    formik.setValues((previous) => ({
      ...previous,
      colorType,
      colorCode: "",
      overtone: "",
      intensity: "",
    }));
    formik.setFieldTouched("colorCode", false, false);
    formik.setFieldTouched("overtone", false, false);
    formik.setFieldTouched("intensity", false, false);
  };

  const renderMediaFields = (title, prefix, existingMedia, type) => {
    const linksKey = `${prefix}Links`;
    const pathsKey = `${prefix}Paths`;
    const previewUrl = splitLines(formik.values[linksKey])[0];

    return (
      <section className="space-y-3 rounded-lg border border-border p-4">
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="text-xs text-muted-foreground">
            Paste a direct media URL or an existing storage path, one per line.
            The stone API saves references only; upload files to your media
            storage separately.
            {existingMedia && " Clear both fields to remove the current media."}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            [linksKey, "Media URL(s)", "https://example.com/media-file"],
            [pathsKey, "Storage path(s)", "uploads/media-file"],
          ].map(([key, label, placeholder]) => (
            <div key={key}>
              <label
                htmlFor={`stone-${key}`}
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                {label}
              </label>
              <Textarea
                id={`stone-${key}`}
                name={key}
                value={formik.values[key]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={placeholder}
                disabled={saving}
                className="min-h-20"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Enter one value per line.
              </p>
            </div>
          ))}
        </div>
        <MediaPreview key={previewUrl} type={type} src={previewUrl} />
      </section>
    );
  };

  const stoneForm = (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <section className="space-y-3">
        <h3 className="text-sm font-semibold">Identification</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {renderTextField("stockId", "Stock ID", 100, true)}
          {renderTextField("stoneType", "Stone Type", 100, true)}
          <div>
            <label
              htmlFor="stone-shape"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Shape<span className="ml-1 text-destructive">*</span>
            </label>
            <Select
              value={formik.values.shapeId}
              onValueChange={(value) => formik.setFieldValue("shapeId", value)}
              disabled={saving}
            >
              <SelectTrigger id="stone-shape">
                <SelectValue placeholder="Select shape" />
              </SelectTrigger>
              <SelectContent>
                {shapes.map((shape) => (
                  <SelectItem key={shape.id} value={`${shape.id}`}>
                    {shape.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formik.touched.shapeId && formik.errors.shapeId && (
              <p className="mt-1 text-sm text-destructive">
                {formik.errors.shapeId}
              </p>
            )}
          </div>
          {renderTextField("lab", "Lab", 50)}
          {renderTextField("report", "Report", 100)}
          {renderEnumSelect(
            "growthType",
            "Growth Type",
            stoneEnumOptions.growthType,
          )}
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold">Grading and dimensions</h3>
        <div className="grid gap-4 md:grid-cols-4">
          {renderDecimalField(stoneDecimalFields[0])}
          <div>
            <label
              htmlFor="stone-colorType"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Color Type<span className="ml-1 text-destructive">*</span>
            </label>
            <Select
              value={formik.values.colorType}
              onValueChange={handleColorTypeChange}
              disabled={saving}
            >
              <SelectTrigger id="stone-colorType">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {stoneEnumOptions.colorType.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {renderEnumSelect(
            "colorCode",
            `${formik.values.colorType} Color Code`,
            formik.values.colorType === "White"
              ? stoneEnumOptions.whiteColorCode
              : stoneEnumOptions.fancyColorCode,
          )}
          {formik.values.colorType === "Fancy" && (
            <>
              {renderEnumSelect(
                "overtone",
                "Fancy Overtone",
                stoneEnumOptions.fancyOvertone,
              )}
              {renderEnumSelect(
                "intensity",
                "Fancy Intensity",
                stoneEnumOptions.fancyIntensity,
              )}
            </>
          )}
          {renderEnumSelect("clarity", "Clarity", stoneEnumOptions.clarity)}
          {renderTextField("cut", "Cut", 100)}
          {renderTextField("polish", "Polish", 100)}
          {renderTextField("symmetry", "Symmetry", 100)}
          {renderTextField("fluorescence", "Fluorescence", 100)}
          {stoneDecimalFields.slice(1, 6).map(renderDecimalField)}
          {stoneDecimalFields.slice(9).map(renderDecimalField)}
          {renderTextField("culetSize", "Culet Size", 100)}
          {renderTextField("girdleName", "Girdle Name", 100)}
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold">Pricing and certificate</h3>
        <div className="grid gap-4 md:grid-cols-4">
          {stoneDecimalFields.slice(6, 9).map(renderDecimalField)}
          {renderTextField("certificateLink", "Certificate Link", 2000)}
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold">Product media</h3>
        <div className="grid gap-4">
          {renderMediaFields(
            "Product image",
            "productImg",
            selectedStone?.productImg,
            "image",
          )}
          {renderMediaFields(
            "Product video",
            "productVideo",
            selectedStone?.productVideo,
            "video",
          )}
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold">Description and availability</h3>
        <div>
          <label
            htmlFor="stone-description"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Description
          </label>
          <Textarea
            id="stone-description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            maxLength={4000}
            disabled={saving}
            className="min-h-24"
          />
          {formik.touched.description && formik.errors.description && (
            <p className="mt-1 text-sm text-destructive">
              {formik.errors.description}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
          <div>
            <p className="text-sm font-medium">Available</p>
            <p className="text-xs text-muted-foreground">
              Whether this stone can be selected for sale.
            </p>
          </div>
          <Switch
            checked={formik.values.isAvailable}
            onCheckedChange={(checked) =>
              formik.setFieldValue("isAvailable", checked)
            }
            disabled={saving}
          />
        </div>
      </section>

      <DialogFooter className="sticky bottom-0 border-t border-border bg-card py-4">
        <Button
          type="button"
          variant="outline"
          disabled={saving}
          onClick={handleCancelForm}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={saving} className="gap-2">
          <PencilLine className="h-4 w-4" />
          {saving ? "Saving..." : "Save stone"}
        </Button>
      </DialogFooter>
    </form>
  );

  if (isFormPage) {
    if (isEditPage && (loading || !selectedStone)) {
      return (
        <div className="space-y-4">
          <PageHeader title="Edit Stone" subtitle="Loading stone details..." />
          <Card>
            <CardContent className="p-6 text-sm text-muted-foreground">
              Loading stone details...
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <PageHeader
          title={isEditPage ? "Edit Stone" : "Add Stone"}
          subtitle={
            isEditPage
              ? "Update stone identification, grading, dimensions, and product media."
              : "Enter stone identification, grading, dimensions, and optional product media."
          }
          action={
            <Button
              type="button"
              variant="outline"
              onClick={handleCancelForm}
              disabled={saving}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Stone Master
            </Button>
          }
        />
        {!loading && shapes.length === 0 && (
          <p className="rounded-lg border border-border bg-muted/30 p-3 text-sm text-muted-foreground">
            Add a shape in Shape Master before creating a stone.
          </p>
        )}
        <Card>
          <CardContent className="p-6">{stoneForm}</CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <PageHeader
        title="Stone Master"
        subtitle="Manage stones, specifications, shape, certificates, and product media."
      />

      <SearchToolbar
        value={search}
        onChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        onAdd={openCreatePage}
        addLabel="Add stone"
        disabled={loading || saving || shapes.length === 0}
      />
      {!loading && shapes.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Add a shape in Shape Master before creating a stone.
        </p>
      )}

      <DataTable
        rows={visibleStones}
        columns={stoneColumns}
        page={currentPage}
        pageSize={stonePageSize}
        total={filteredStones.length}
        onPageChange={setPage}
        onEdit={openEditPage}
        onDelete={(stone) => {
          setSelectedStone(stone);
          setActiveDialog("delete");
        }}
      />

      <DeleteDialog
        open={activeDialog === "delete"}
        onOpenChange={(open) => {
          if (!deleting) setActiveDialog(open ? "delete" : null);
        }}
        onConfirm={handleDelete}
        itemName="stone"
        description="This stone will be removed from active inventory."
        confirmDisabled={deleting}
      />
    </div>
  );
};

export default StonePage;

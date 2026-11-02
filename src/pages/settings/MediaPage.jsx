import React, { useEffect, useMemo, useRef, useState } from "react";
import { useFormik } from "formik";
import { FileVideo, ImagePlus, PencilLine, UploadCloud, X } from "lucide-react";
import { useDropzone } from "react-dropzone";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  createMedia,
  deleteMedia,
  getMedia,
  updateMedia,
} from "@/services/media";

const pageSize = 8;
const emptyForm = { type: "Image", mediaLink: "", mediaPath: "" };
const splitValues = (value) =>
  value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
const joinValues = (values) => (Array.isArray(values) ? values.join("\n") : "");

const mediaColumns = [
  { id: "id", name: "ID" },
  { id: "type", name: "Type" },
  {
    id: "mediaLink",
    name: "Media Links",
    render: (media) => media.mediaLink?.join(", ") || "—",
    cellClassName: "max-w-xs truncate",
  },
  {
    id: "mediaPath",
    name: "Media Paths",
    render: (media) => media.mediaPath?.join(", ") || "—",
    cellClassName: "max-w-xs truncate",
  },
  {
    id: "createdAt",
    name: "Created Date",
    render: (media) =>
      media.createdAt
        ? new Date(media.createdAt).toLocaleDateString("en-IN")
        : "—",
  },
];

const MediaPage = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [activeDialog, setActiveDialog] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const typeInputRef = useRef(null);
  const { showLoader, hideLoader } = useLoader();
  const { showToasts } = useToast();

  const handleError = (error) => {
    showToasts("error", error?.message || "Something went wrong.", 5000, true);
  };

  const formik = useFormik({
    initialValues: emptyForm,
    validate: (values) => {
      const errors = {};
      if (!["Image", "Video"].includes(values.type)) {
        errors.type = "Select a valid media type.";
      }
      if (
        !splitValues(values.mediaLink).length &&
        !splitValues(values.mediaPath).length
      ) {
        errors.mediaLink = "Add at least one media link or media path.";
      }
      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      const isEditing = Boolean(selectedMedia);
      const payload = {
        type: values.type,
        mediaLink: splitValues(values.mediaLink),
        mediaPath: splitValues(values.mediaPath),
      };

      setSaving(true);
      showLoader(
        isEditing ? "Updating media" : "Creating media",
        "Please wait while the media record is saved.",
        null,
        { scope: "dialog", blocking: true },
      );
      try {
        const savedMedia = selectedMedia
          ? await updateMedia(selectedMedia.id, payload)
          : await createMedia(payload);

        setMediaItems((previous) =>
          selectedMedia
            ? previous.map((item) =>
                item.id === savedMedia.id ? savedMedia : item,
              )
            : [savedMedia, ...previous],
        );
        setActiveDialog(null);
        setSelectedMedia(null);
        setSelectedFiles([]);
        resetForm({ values: emptyForm });
        setPage(1);
        showToasts(
          "success",
          isEditing
            ? "Media updated successfully."
            : "Media created successfully.",
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

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    open: openFilePicker,
  } = useDropzone({
    accept:
      formik.values.type === "Image" ? { "image/*": [] } : { "video/*": [] },
    multiple: true,
    noClick: true,
    noKeyboard: true,
    disabled: saving,
    onDrop: (files) => {
      setSelectedFiles((previous) => [...previous, ...files]);
    },
    onDropRejected: () => {
      showToasts(
        "error",
        `Select ${formik.values.type.toLowerCase()} files only.`,
        4000,
      );
    },
  });

  useEffect(() => {
    let active = true;

    const loadMedia = async () => {
      setLoading(true);
      try {
        const result = await getMedia();
        if (active) setMediaItems(result);
      } catch (error) {
        if (active) handleError(error);
      } finally {
        if (active) setLoading(false);
      }
    };

    loadMedia();
    return () => {
      active = false;
    };
  }, []);

  const filteredMedia = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return mediaItems;

    return mediaItems.filter((media) =>
      [
        media.id,
        media.type,
        ...(media.mediaLink ?? []),
        ...(media.mediaPath ?? []),
      ].some((value) => `${value ?? ""}`.toLowerCase().includes(query)),
    );
  }, [mediaItems, search]);

  const totalPages = Math.max(1, Math.ceil(filteredMedia.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleMedia = filteredMedia.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const openCreateDialog = () => {
    setSelectedMedia(null);
    setSelectedFiles([]);
    formik.resetForm({ values: emptyForm });
    setActiveDialog("form");
  };

  const openEditDialog = (media) => {
    setSelectedMedia(media);
    setSelectedFiles([]);
    formik.resetForm({
      values: {
        type: media.type ?? "Image",
        mediaLink: joinValues(media.mediaLink),
        mediaPath: joinValues(media.mediaPath),
      },
    });
    setActiveDialog("form");
  };

  const handleDelete = async () => {
    if (!selectedMedia) return;

    setDeleting(true);
    showLoader(
      "Deleting media",
      "Please wait while the media record is removed.",
      null,
      { scope: "dialog", blocking: true },
    );
    try {
      await deleteMedia(selectedMedia.id);
      setMediaItems((previous) =>
        previous.filter((item) => item.id !== selectedMedia.id),
      );
      setActiveDialog(null);
      setSelectedMedia(null);
      showToasts("success", "Media deleted successfully.", 3000);
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
        title="Media"
        subtitle="Manage image and video links and paths used by your catalog."
      />

      <SearchToolbar
        value={search}
        onChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        onAdd={openCreateDialog}
        addLabel="Add media"
        disabled={loading || saving}
        isAllowedToAdd={false}
      />

      <DataTable
        rows={visibleMedia}
        columns={mediaColumns}
        page={currentPage}
        pageSize={pageSize}
        total={filteredMedia.length}
        onPageChange={setPage}
        onEdit={openEditDialog}
        onDelete={(media) => {
          setSelectedMedia(media);
          setActiveDialog("delete");
        }}
      />

      <CommonDialog
        openDialog={activeDialog === "form"}
        setOpenDialog={(open) => {
          if (!saving) setActiveDialog(open ? "form" : null);
        }}
        onClose={() => {
          formik.resetForm({ values: emptyForm });
          setSelectedMedia(null);
          setSelectedFiles([]);
        }}
        disableClose={saving}
        header="Media settings"
        title={selectedMedia ? "Edit media" : "Add media"}
        subheader="Select a media type and enter one or more links or paths, one per line."
        initialFocusRef={typeInputRef}
        content={
          <form onSubmit={formik.handleSubmit}>
            <div className="space-y-4 py-4">
              <div>
                <label
                  htmlFor="media-type"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Type<span className="ml-1 text-destructive">*</span>
                </label>
                <Select
                  value={formik.values.type}
                  onValueChange={(value) => formik.setFieldValue("type", value)}
                  disabled={saving}
                >
                  <SelectTrigger id="media-type" ref={typeInputRef}>
                    <SelectValue placeholder="Select media type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Image">Image</SelectItem>
                    <SelectItem value="Video">Video</SelectItem>
                  </SelectContent>
                </Select>
                {formik.touched.type && formik.errors.type && (
                  <p className="mt-1 text-sm text-destructive">
                    {formik.errors.type}
                  </p>
                )}
              </div>

              <div>
                <div
                  {...getRootProps({
                    className: `rounded-lg border border-dashed p-5 text-center transition-colors ${
                      isDragActive
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/60"
                    } ${saving ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`,
                  })}
                >
                  <input {...getInputProps()} />
                  {formik.values.type === "Image" ? (
                    <ImagePlus className="mx-auto h-6 w-6 text-muted-foreground" />
                  ) : (
                    <FileVideo className="mx-auto h-6 w-6 text-muted-foreground" />
                  )}
                  <p className="mt-2 text-sm font-medium">
                    {isDragActive
                      ? `Drop ${formik.values.type.toLowerCase()} files here`
                      : `Drag ${formik.values.type.toLowerCase()} files here`}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Files are selected locally only; this API does not upload
                    them. Save an accessible URL or path below.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={openFilePicker}
                    disabled={saving}
                  >
                    <UploadCloud className="mr-2 h-4 w-4" />
                    Browse files
                  </Button>
                </div>

                {selectedFiles.length > 0 && (
                  <ul className="mt-2 space-y-1.5">
                    {selectedFiles.map((file, index) => (
                      <li
                        key={`${file.name}-${file.lastModified}-${index}`}
                        className="flex items-center justify-between gap-3 rounded-md border border-border px-3 py-2 text-sm"
                      >
                        <span className="min-w-0 truncate">
                          {file.name}
                          <span className="ml-2 text-xs text-muted-foreground">
                            {(file.size / 1024).toFixed(1)} KB · not uploaded
                          </span>
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`Remove ${file.name}`}
                          onClick={(event) => {
                            event.stopPropagation();
                            setSelectedFiles((previous) =>
                              previous.filter(
                                (_, fileIndex) => fileIndex !== index,
                              ),
                            );
                          }}
                          disabled={saving}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <label
                  htmlFor="media-links"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Media Links
                </label>
                <Textarea
                  id="media-links"
                  name="mediaLink"
                  value={formik.values.mediaLink}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={
                    "https://example.com/image.jpg\nhttps://example.com/alternate.jpg"
                  }
                  disabled={saving}
                  aria-invalid={Boolean(
                    formik.submitCount > 0 && formik.errors.mediaLink,
                  )}
                />
              </div>

              <div>
                <label
                  htmlFor="media-paths"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Media Paths
                </label>
                <Textarea
                  id="media-paths"
                  name="mediaPath"
                  value={formik.values.mediaPath}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={"uploads/image.jpg\nuploads/alternate.jpg"}
                  disabled={saving}
                  aria-invalid={Boolean(
                    formik.submitCount > 0 && formik.errors.mediaLink,
                  )}
                />
                {formik.errors.mediaLink && formik.submitCount > 0 && (
                  <p className="mt-1 text-sm text-destructive">
                    {formik.errors.mediaLink}
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
                  formik.resetForm({ values: emptyForm });
                  setSelectedMedia(null);
                  setSelectedFiles([]);
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
        itemName="media"
        description="This media record will be removed if it is not assigned to a stone."
        confirmDisabled={deleting}
      />
    </div>
  );
};

export default MediaPage;

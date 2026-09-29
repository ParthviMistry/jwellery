import React, { useRef, useState } from "react";
import { File, FileImage, FileVideo, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";

const DEFAULT_ACCEPT = {
  image: ["image/jpeg", "image/png", "image/webp"],
  video: ["video/mp4", "video/webm"],
  pdf: ["application/pdf"],
};

const FileUpload = ({
  value = [],
  onChange,
  multiple = true,
  accept = DEFAULT_ACCEPT,
  maxSizeMB = 10,
  maxFiles = 10,
  disabled = false,
  className = "",
}) => {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  const acceptedTypes = Object.values(accept).flat();

  const getFileType = (file) => {
    if (file.type.startsWith("image/")) {
      return "image";
    }

    if (file.type.startsWith("video/")) {
      return "video";
    }

    if (file.type === "application/pdf") {
      return "pdf";
    }

    return "file";
  };

  const validateFiles = (files) => {
    const validFiles = [];

    for (const file of files) {
      if (!acceptedTypes.includes(file.type)) {
        setError(`File type not supported: ${file.name}`);
        continue;
      }

      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`${file.name} exceeds the ${maxSizeMB}MB limit.`);
        continue;
      }

      validFiles.push(file);
    }

    return validFiles;
  };

  const addFiles = (files) => {
    setError("");

    const validFiles = validateFiles(files);

    if (!validFiles.length) {
      return;
    }

    const currentFiles = Array.isArray(value) ? value : [];

    const combinedFiles = multiple
      ? [...currentFiles, ...validFiles]
      : [validFiles[0]];

    if (combinedFiles.length > maxFiles) {
      setError(`You can upload up to ${maxFiles} files.`);
      return;
    }

    onChange?.(combinedFiles);
  };

  const handleInputChange = (event) => {
    addFiles(Array.from(event.target.files || []));

    // Allows selecting the same file again.
    event.target.value = "";
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    if (disabled) {
      return;
    }

    addFiles(Array.from(event.dataTransfer.files || []));
  };

  const removeFile = (index) => {
    const updatedFiles = value.filter((_, fileIndex) => fileIndex !== index);

    onChange?.(updatedFiles);
  };

  const getFileIcon = (file) => {
    const type = getFileType(file);

    if (type === "image") {
      return <FileImage className="h-5 w-5" />;
    }

    if (type === "video") {
      return <FileVideo className="h-5 w-5" />;
    }

    return <File className="h-5 w-5" />;
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <input
        ref={inputRef}
        type="file"
        hidden
        multiple={multiple}
        accept={acceptedTypes.join(",")}
        onChange={handleInputChange}
        disabled={disabled}
      />

      <div
        onDragOver={(event) => {
          event.preventDefault();

          if (!disabled) {
            setIsDragging(true);
          }
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25"
        } ${
          disabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer hover:border-primary/50"
        }`}
        onClick={() => {
          if (!disabled) {
            inputRef.current?.click();
          }
        }}
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <Upload className="h-6 w-6 text-muted-foreground" />
        </div>

        <p className="mt-3 text-sm font-medium">Drag & drop files here</p>

        <p className="mt-1 text-sm text-muted-foreground">or click to browse</p>

        <p className="mt-2 text-xs text-muted-foreground">
          Maximum {maxSizeMB}MB per file
        </p>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-4"
          disabled={disabled}
          onClick={(event) => {
            event.stopPropagation();
            inputRef.current?.click();
          }}
        >
          Choose Files
        </Button>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {value.length > 0 && (
        <div className="space-y-2">
          {value.map((file, index) => (
            <div
              key={`${file.name}-${file.lastModified}-${index}`}
              className="flex items-center gap-3 rounded-lg border p-3"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted">
                {getFileIcon(file)}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{file.name}</p>

                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeFile(index)}
                disabled={disabled}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove {file.name}</span>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;

import React from "react";
import { FileSearch } from "lucide-react";

import { Button } from "@/components/ui/button";

const NoRecordFound = ({
  title = "No records found",
  description = "There are no records to display.",
  actionLabel,
  onAction,
  icon: Icon = FileSearch,
  className = "",
}) => {
  return (
    <div
      className={`flex min-h-[240px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center ${className}`}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Icon className="h-6 w-6 text-muted-foreground" />
      </div>

      <h3 className="text-base font-semibold">{title}</h3>

      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        {description}
      </p>

      {actionLabel && onAction && (
        <Button type="button" className="mt-4" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default NoRecordFound;

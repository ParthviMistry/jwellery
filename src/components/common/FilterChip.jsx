import React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";

const FilterChip = ({
  label,
  onRemove,
  variant = "secondary",
  className = "",
}) => {
  return (
    <Badge variant={variant} className={`gap-1 pr-1 ${className}`}>
      <span className="max-w-[180px] truncate">{label}</span>

      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-1 rounded-full p-0.5 transition-colors hover:bg-black/10"
          aria-label={`Remove ${label} filter`}
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </Badge>
  );
};

export default FilterChip;

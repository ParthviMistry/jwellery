import React from "react";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const AccessToggle = ({
  label,
  checked = false,
  onCheckedChange,
  description,
  disabled = false,
  id,
  className = "",
}) => {
  const switchId =
    id || `access-toggle-${label?.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-lg border p-3 ${className}`}
    >
      <div className="min-w-0">
        <Label htmlFor={switchId} className="cursor-pointer font-medium">
          {label}
        </Label>

        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <Switch
        id={switchId}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      />
    </div>
  );
};

export default AccessToggle;

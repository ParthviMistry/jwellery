import React from "react";
import { cn } from "@/lib/utils";

export default function StatusBadge({ isActive, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        isActive
          ? "bg-success/10 text-success"
          : "bg-muted text-muted-foreground",
        className
      )}
    >
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}

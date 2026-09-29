import React from "react";
import { cn } from "@/lib/utils";

export default function PageHeader({ title, subtitle, action, className }) {
  return (
    <div
      className={cn(
        "mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between",
        className,
      )}
    >
      <div>
        <h1 className="font-display text-lg font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}

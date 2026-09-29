import React from "react";
import { Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmptyState({ title = "No records found", description, onAdd }) {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Inbox className="h-5 w-5" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>}
      {onAdd && (
        <Button onClick={onAdd} className="mt-5">
          Add record
        </Button>
      )}
    </div>
  );
}

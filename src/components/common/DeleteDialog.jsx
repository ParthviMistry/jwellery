import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LoaderSurface } from "@/hooks/use-loader";

export default function DeleteDialog({
  open,
  onOpenChange,
  onConfirm,
  itemName = "record",
  description = "This action cannot be undone. The selected item will be permanently removed.",
  confirmDisabled = false,
  error = "",
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          fixed
          left-1/2
          top-1/2
          z-50
          w-[calc(100%-2rem)]
          max-w-md
          -translate-x-1/2
          -translate-y-1/2
          p-6
        "
      >
        <LoaderSurface scope="dialog" />

        <DialogHeader>
          <DialogTitle>Delete {itemName}?</DialogTitle>

          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <DialogFooter className="mt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={confirmDisabled}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={confirmDisabled}
          >
            {confirmDisabled ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

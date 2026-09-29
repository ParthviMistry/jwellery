import React, { useEffect, useState } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const PinConfirmationDialog = ({
  open,
  onOpenChange,
  onConfirm,
  title = "Confirm Action",
  description = "Please enter your PIN to continue.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  pinLength = 4,
  loading = false,
}) => {
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) {
      setPin("");
      setError("");
      setShowPin(false);
    }
  }, [open]);

  const handlePinChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");

    if (value.length <= pinLength) {
      setPin(value);
      setError("");
    }
  };

  const handleConfirm = async () => {
    if (pin.length !== pinLength) {
      setError(`Please enter a ${pinLength}-digit PIN.`);
      return;
    }

    setError("");

    await onConfirm?.(pin);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <LockKeyhole className="h-5 w-5 text-primary" />
          </div>

          <DialogTitle>{title}</DialogTitle>

          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-2 py-4">
          <Label htmlFor="confirmation-pin">Enter PIN</Label>

          <div className="relative">
            <Input
              id="confirmation-pin"
              type={showPin ? "text" : "password"}
              inputMode="numeric"
              autoComplete="off"
              value={pin}
              onChange={handlePinChange}
              placeholder={`Enter ${pinLength}-digit PIN`}
              maxLength={pinLength}
              disabled={loading}
              className="pr-10 tracking-[0.35em]"
            />

            <button
              type="button"
              onClick={() => setShowPin((previous) => !previous)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={showPin ? "Hide PIN" : "Show PIN"}
            >
              {showPin ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            {cancelText}
          </Button>

          <Button
            type="button"
            onClick={handleConfirm}
            disabled={loading || pin.length !== pinLength}
          >
            {loading ? "Verifying..." : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PinConfirmationDialog;

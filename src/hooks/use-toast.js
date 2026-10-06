import { useCallback } from "react";
import { toast } from "sonner";

export function useToast() {
  const showToasts = useCallback(
    (type, message, timer = 4000, manualClose = true) => {
      const showToast = toast[type];
      if (typeof showToast !== "function") {
        throw new Error(`Unsupported toast type: ${type}`);
      }

      return showToast(message, {
        duration: timer,
        closeButton: manualClose,
      });
    },
    [],
  );

  return { showToasts };
}

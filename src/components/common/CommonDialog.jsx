import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoaderSurface } from "@/hooks/use-loader";

export default function CommonDialog({
  title,
  header,
  subheader,
  onClose,
  setOpenDialog,
  openDialog,
  content,
  initialFocusRef,
  className = "",
  disableClose = false,
}) {
  const handleOpenChange = (open) => {
    if (!open && disableClose) return;

    setOpenDialog(open);
    if (!open) onClose?.();
  };

  return (
    <Dialog open={openDialog} onOpenChange={handleOpenChange}>
      <DialogContent
        className={`w-[calc(100%-2rem)] max-w-xl ${className}`}
        onOpenAutoFocus={(event) => {
          if (initialFocusRef?.current) {
            event.preventDefault();
            initialFocusRef.current.focus({ preventScroll: true });
          }
        }}
      >
        {" "}
        <LoaderSurface scope="dialog" />
        <DialogHeader>
          {header && (
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {header}
            </p>
          )}
          <DialogTitle>{title}</DialogTitle>
          <div className="h-px w-full bg-border" aria-hidden="true" />
          {subheader && <DialogDescription>{subheader}</DialogDescription>}
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
}

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      position="top-right"
      richColors
      closeButton
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={{
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
        "--border-radius": "var(--radius)",
      }}
      toastOptions={{
        classNames: {
          toast: "cn-toast !relative !pr-12",

          closeButton:
            "!absolute !right-3 !top-1/2 !-translate-y-1/2 !left-auto !m-0 !flex !h-7 !w-7 !items-center !justify-center !rounded-md !border-0 !bg-transparent !p-0 !text-current !opacity-60 hover:!opacity-100",

          success:
            "!border-green-300 !bg-green-50 !text-green-900 dark:!border-green-800 dark:!bg-green-950 dark:!text-green-100",

          error:
            "!border-red-300 !bg-red-50 !text-red-900 dark:!border-red-800 dark:!bg-red-950 dark:!text-red-100",

          info: "!border-yellow-300 !bg-yellow-50 !text-yellow-950 dark:!border-yellow-800 dark:!bg-yellow-950 dark:!text-yellow-100",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

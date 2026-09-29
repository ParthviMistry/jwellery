import React from "react";
import { Spinner } from "@/components/ui/spinner";

const Loader = ({
  size = "default",
  text,
  fullscreen = false,
  className = "",
}) => {
  const sizeClass = {
    sm: "size-4",
    default: "size-5",
    lg: "size-8",
    xl: "size-10",
  };

  const content = (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <Spinner className={sizeClass[size] || sizeClass.default} />

      {text && <span className="text-sm text-muted-foreground">{text}</span>}
    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;

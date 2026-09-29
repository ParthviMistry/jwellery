import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const IconButton = ({
  icon,
  tooltip,
  onClick,
  variant = "ghost",
  size = "icon",
  disabled = false,
  className = "",
  type = "button",
  side = "top",
  ...props
}) => {
  const button = (
    <Button
      type={type}
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
      className={className}
      {...props}
    >
      {icon}
      <span className="sr-only">{tooltip || "Action"}</span>
    </Button>
  );

  if (!tooltip) return button;

  return (
    <TooltipProvider delayDuration={250}>
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side={side}>
          {tooltip}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default IconButton;

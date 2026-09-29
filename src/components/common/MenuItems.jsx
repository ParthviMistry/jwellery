import React from "react";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MenuItems = ({
  items = [],
  label,
  align = "end",
  side = "bottom",
  trigger,
  disabled = false,
  className = "",
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger || (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={disabled}
            className={className}
            aria-label="Open actions"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open actions</span>
          </Button>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align={align}
        side={side}
        sideOffset={6}
        className="w-48"
      >
        {label && (
          <>
            <DropdownMenuLabel>{label}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuGroup>
          {items.map((item, index) => {
            if (item.separator) {
              return (
                <DropdownMenuSeparator key={`separator-${index}`} />
              );
            }

            return (
              <DropdownMenuItem
                key={item.key ?? `${item.label}-${index}`}
                disabled={Boolean(item.disabled)}
                onSelect={(event) => {
                  if (item.preventClose) {
                    event.preventDefault();
                  }

                  item.onClick?.(event);
                }}
                className={item.variant === "destructive" ? "text-destructive focus:text-destructive" : ""}
              >
                {item.icon && (
                  <span className="mr-2 flex h-4 w-4 shrink-0 items-center justify-center">
                    {item.icon}
                  </span>
                )}

                <span className="flex-1 truncate">{item.label}</span>

                {item.shortcut && (
                  <span className="ml-3 text-xs text-muted-foreground">
                    {item.shortcut}
                  </span>
                )}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuItems;

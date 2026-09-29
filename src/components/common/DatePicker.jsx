import React from "react";
import { CalendarIcon, X } from "lucide-react";
import { format, isValid } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const DatePicker = ({
  value,
  onChange,
  placeholder = "Pick a date",
  disabled = false,
  className = "",
  minDate,
  maxDate,
  clearable = true,
}) => {
  const selectedDate =
    value instanceof Date && isValid(value) ? value : undefined;

  const handleSelect = (date) => {
    onChange?.(date);
  };

  const handleClear = (event) => {
    event.stopPropagation();
    onChange?.(undefined);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />

          <span className="flex-1 truncate">
            {selectedDate
              ? format(selectedDate, "dd MMM yyyy")
              : placeholder}
          </span>

          {selectedDate && clearable && (
            <span
              role="button"
              tabIndex={0}
              aria-label="Clear date"
              className="ml-2 rounded-sm p-0.5 hover:bg-muted"
              onClick={handleClear}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleClear(event);
                }
              }}
            >
              <X className="h-3.5 w-3.5" />
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        sideOffset={4}
        className="w-auto p-0"
      >
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          initialFocus
          disabled={(date) => {
            if (minDate && date < minDate) return true;
            if (maxDate && date > maxDate) return true;
            return false;
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;

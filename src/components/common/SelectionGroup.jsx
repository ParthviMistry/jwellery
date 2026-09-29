import React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const SelectionGroup = ({
  type = "radio",
  options = [],
  value,
  onChange,
  name = "selection",
  disabled = false,
  orientation = "vertical",
  className = "",
}) => {
  const isHorizontal = orientation === "horizontal";

  if (type === "radio") {
    return (
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className={`${isHorizontal ? "flex flex-wrap gap-4" : "space-y-3"} ${className}`}
      >
        {options.map((option) => {
          const optionId = `${name}-${option.value}`;

          return (
            <div key={option.value} className="flex items-center gap-2">
              <RadioGroupItem
                id={optionId}
                value={option.value}
                disabled={disabled || option.disabled}
              />

              <Label htmlFor={optionId} className="cursor-pointer font-normal">
                {option.label}
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    );
  }

  const selectedValues = Array.isArray(value) ? value : [];

  const handleCheckboxChange = (optionValue, checked) => {
    if (checked) {
      onChange?.([...selectedValues, optionValue]);
    } else {
      onChange?.(selectedValues.filter((item) => item !== optionValue));
    }
  };

  return (
    <div
      className={`${isHorizontal ? "flex flex-wrap gap-4" : "space-y-3"} ${className}`}
    >
      {options.map((option) => {
        const optionId = `${name}-${option.value}`;
        const checked = selectedValues.includes(option.value);

        return (
          <div key={option.value} className="flex items-center gap-2">
            <Checkbox
              id={optionId}
              checked={checked}
              onCheckedChange={(checked) =>
                handleCheckboxChange(option.value, checked === true)
              }
              disabled={disabled || option.disabled}
            />

            <Label htmlFor={optionId} className="cursor-pointer font-normal">
              {option.label}
            </Label>
          </div>
        );
      })}
    </div>
  );
};

export default SelectionGroup;

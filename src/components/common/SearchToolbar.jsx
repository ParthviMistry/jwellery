import React from "react";
import { Plus, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import IconButton from "@/components/common/IconButton";

const SearchToolbar = ({
  value = "",
  onChange,
  placeholder = "Search...",
  onAdd,
  addLabel = "Add new",
  disabled = false,
  className = "",
  onClear,
}) => {
  const handleChange = (event) => {
    onChange?.(event.target.value);
  };

  const handleClear = () => {
    onChange?.("");
    onClear?.();
  };

  const searchField = (
    <div className={`relative ${onAdd ? "w-full md:max-w-sm" : className}`}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className={value && !onAdd ? "pl-9 pr-9" : "pl-9"}
      />

      {value && !onAdd && (
        <div className="absolute right-1 top-1/2 -translate-y-1/2">
          <IconButton
            icon={<X className="h-4 w-4" />}
            tooltip="Clear"
            size="icon-sm"
            variant="ghost"
            onClick={handleClear}
            disabled={disabled}
          />
        </div>
      )}
    </div>
  );

  if (!onAdd) {
    return searchField;
  }

  return (
    <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      {searchField}
      <Button onClick={onAdd} className="gap-2" disabled={disabled}>
        <Plus className="h-4 w-4" />
        {addLabel}
      </Button>
    </div>
  );
};

export default SearchToolbar;

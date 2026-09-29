import React from "react";
import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import IconButton from "@/components/common/IconButton";

const SearchInput = ({
  value = "",
  onChange,
  placeholder = "Search...",
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

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className="pl-9 pr-9"
      />

      {value && (
        <div className="absolute right-1 top-1/2 -translate-y-1/2">
          <IconButton
            icon={<X className="h-4 w-4" />}
            tooltip="Clear"
            size="icon-sm"
            variant="ghost"
            onClick={handleClear}
          />
        </div>
      )}
    </div>
  );
};

export default SearchInput;
// import React from "react";
// import { Search, Plus } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// export default function SearchToolbar({
//   value,
//   onChange,
//   onAdd,
//   addLabel = "Add New",
// }) {
//   return (
//     <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
//       <div className="relative w-full md:max-w-sm">
//         <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//         <Input
//           value={value}
//           onChange={(event) => onChange(event.target.value)}
//           placeholder="Search..."
//           className="pl-9"
//         />
//       </div>

//       <Button onClick={onAdd} className="gap-2">
//         <Plus className="h-4 w-4" />
//         {addLabel}
//       </Button>
//     </div>
//   );
// }

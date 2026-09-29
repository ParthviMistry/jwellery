import React from "react";
import MasterPage from "@/components/common/MasterPage";
import { stones } from "@/data/mock/stones";

const columns = [
  { key: "stockId", title: "Stock ID" },
  { key: "stoneType", title: "Stone Type" },
  { key: "shape", title: "Shape" },
  { key: "carat", title: "Carat" },
  { key: "colorCode", title: "Color" },
  { key: "clarity", title: "Clarity" },
  { key: "rapo", title: "Rapo" },
  { key: "total", title: "Total" },
];

const formFields = [
  { key: "stockId", label: "Stock ID", required: true, placeholder: "STONE-001" },
  { key: "stoneType", label: "Stone Type", required: true, placeholder: "Diamond" },
  { key: "lab", label: "Lab", placeholder: "GIA" },
  { key: "report", label: "Report", placeholder: "GIA-2456731" },
  { key: "shape", label: "Shape", placeholder: "Round" },
  { key: "carat", label: "Carat", type: "number", placeholder: "1.25" },
  { key: "colorType", label: "Color Type", placeholder: "White" },
  { key: "colorCode", label: "Color Code", placeholder: "E" },
  { key: "clarity", label: "Clarity", placeholder: "VS1" },
  { key: "cut", label: "Cut", placeholder: "Excellent" },
  { key: "polish", label: "Polish", placeholder: "Excellent" },
  { key: "symmetry", label: "Symmetry", placeholder: "Excellent" },
  { key: "fluorescence", label: "Fluorescence", placeholder: "None" },
  { key: "rapo", label: "Rapo", type: "number", placeholder: "182500" },
  { key: "percent", label: "Percent", type: "number", placeholder: "12" },
  { key: "total", label: "Total", type: "number", placeholder: "203600" },
  { key: "growthType", label: "Growth Type", placeholder: "Natural" },
  { key: "isAvailable", label: "Available", type: "checkbox" },
  { key: "description", label: "Description", type: "textarea", fullWidth: true, placeholder: "Stone description" },
];

export default function StonePage() {
  return (
    <MasterPage
      title="Stone Master"
      subtitle="Manage gemstone and diamond inventory master data."
      resourceLabel="stone"
      initialData={stones}
      columns={columns}
      formFields={formFields}
      pageSize={8}
    />
  );
}

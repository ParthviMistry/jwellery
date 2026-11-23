import React from "react";
import CatalogMasterPage from "@/components/common/CatalogMasterPage";

const fields = [
  { key: "name", label: "Name", required: true, maxLength: 100 },
  { key: "description", label: "Description", fullWidth: true },
];

export default function ProductStylePage() {
  return <CatalogMasterPage resource="styles" title="Product Style" subtitle="Manage jewellery styles and design expressions." fields={fields} />;
}

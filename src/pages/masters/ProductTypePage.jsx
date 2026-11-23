import React from "react";
import CatalogMasterPage from "@/components/common/CatalogMasterPage";

const fields = [
  { key: "name", label: "Name", required: true, maxLength: 100 },
  { key: "description", label: "Description", fullWidth: true },
];

export default function ProductTypePage() {
  return <CatalogMasterPage resource="product-types" title="Product Type" subtitle="Manage types that can be assigned to products." fields={fields} />;
}

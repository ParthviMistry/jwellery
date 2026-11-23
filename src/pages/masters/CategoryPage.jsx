import React from "react";
import CatalogMasterPage from "@/components/common/CatalogMasterPage";

const fields = [
  { key: "name", label: "Name", required: true, maxLength: 100 },
  { key: "description", label: "Description", fullWidth: true },
  { key: "image", label: "Image URL", maxLength: 2000 },
];

export default function CategoryPage() {
  return <CatalogMasterPage resource="categories" title="Category" subtitle="Manage product categories for the jewellery catalog." fields={fields} />;
}

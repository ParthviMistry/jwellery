import React from "react";
import CatalogMasterPage from "@/components/common/CatalogMasterPage";

const fields = [
  { key: "categoryId", label: "Category", required: true, list: false },
  { key: "categoryName", label: "Category", form: false },
  { key: "name", label: "Name", required: true, maxLength: 100 },
  { key: "description", label: "Description", fullWidth: true },
  { key: "image", label: "Image URL", maxLength: 2000 },
];

export default function SubCategoryPage() {
  return <CatalogMasterPage resource="subcategories" title="Subcategory" subtitle="Manage subcategories and their parent categories." fields={fields} />;
}

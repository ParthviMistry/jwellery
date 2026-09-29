import React from "react";
import MasterPage from "@/components/common/MasterPage";
import { subcategories } from "@/data/mock/subcategories";

const columns = [
  { key: "id", title: "ID" },
  { key: "categoryId", title: "Category ID" },
  { key: "name", title: "Name" },
  { key: "code", title: "Code" },
  { key: "description", title: "Description" },
];

const formFields = [
  { key: "categoryId", label: "Category ID", required: true, placeholder: "e.g. CAT-001" },
  { key: "name", label: "Name", required: true, placeholder: "e.g. Solitaire" },
  { key: "code", label: "Code", required: true, placeholder: "e.g. SOL" },
  { key: "description", label: "Description", type: "textarea", fullWidth: true, placeholder: "Enter description" },
];

export default function SubCategoryPage() {
  return (
    <MasterPage
      title="SubCategory"
      subtitle="Manage subcategory groupings for product catalog structure."
      resourceLabel="subcategory"
      initialData={subcategories}
      columns={columns}
      formFields={formFields}
      pageSize={8}
    />
  );
}

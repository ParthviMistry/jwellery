import React from "react";
import MasterPage from "@/components/common/MasterPage";
import { categories } from "@/data/mock/categories";

const columns = [
  { key: "id", title: "ID" },
  { key: "name", title: "Name" },
  { key: "code", title: "Code" },
  { key: "description", title: "Description" },
];

const formFields = [
  { key: "name", label: "Name", required: true, placeholder: "e.g. Rings" },
  { key: "code", label: "Code", required: true, placeholder: "e.g. RNG" },
  { key: "description", label: "Description", type: "textarea", fullWidth: true, placeholder: "Enter description" },
];

export default function CategoryPage() {
  return (
    <MasterPage
      title="Category"
      subtitle="Manage product categories for the jewellery catalog."
      resourceLabel="category"
      initialData={categories}
      columns={columns}
      formFields={formFields}
      pageSize={8}
    />
  );
}

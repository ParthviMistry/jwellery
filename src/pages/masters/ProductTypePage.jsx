import React from "react";
import MasterPage from "@/components/common/MasterPage";
import { productTypes } from "@/data/mock/productTypes";

const columns = [
  { key: "id", title: "ID" },
  { key: "name", title: "Name" },
  { key: "code", title: "Code" },
  { key: "description", title: "Description" },
];

const formFields = [
  { key: "name", label: "Name", required: true, placeholder: "e.g. Ring" },
  { key: "code", label: "Code", required: true, placeholder: "e.g. RNG" },
  { key: "description", label: "Description", type: "textarea", fullWidth: true, placeholder: "Enter product type description" },
];

export default function ProductTypePage() {
  return (
    <MasterPage
      title="Product Type"
      subtitle="Maintain product type values used across catalog and pricing flow."
      resourceLabel="product type"
      initialData={productTypes}
      columns={columns}
      formFields={formFields}
      pageSize={8}
    />
  );
}

import React from "react";
import MasterPage from "@/components/common/MasterPage";
import { productStyles } from "@/data/mock/productStyles";

const columns = [
  { key: "id", title: "ID" },
  { key: "name", title: "Name" },
  { key: "code", title: "Code" },
  { key: "description", title: "Description" },
];

const formFields = [
  { key: "name", label: "Name", required: true, placeholder: "e.g. Classic" },
  { key: "code", label: "Code", required: true, placeholder: "e.g. CLS" },
  { key: "description", label: "Description", type: "textarea", fullWidth: true, placeholder: "Enter style description" },
];

export default function ProductStylePage() {
  return (
    <MasterPage
      title="Product Style"
      subtitle="Manage jewellery styling categories and design expressions."
      resourceLabel="style"
      initialData={productStyles}
      columns={columns}
      formFields={formFields}
      pageSize={8}
    />
  );
}

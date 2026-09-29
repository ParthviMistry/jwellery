import React from "react";
import MasterPage from "@/components/common/MasterPage";
import { brands } from "@/data/mock/brands";

const columns = [
  { key: "id", title: "ID" },
  { key: "name", title: "Name" },
  { key: "code", title: "Code" },
  { key: "logo", title: "Logo" },
  { key: "description", title: "Description" },
];

const formFields = [
  { key: "name", label: "Name", required: true, placeholder: "e.g. Regnor Signature" },
  { key: "code", label: "Code", required: true, placeholder: "e.g. RGS" },
  { key: "logo", label: "Logo URL", placeholder: "https://example.com/logo.png" },
  { key: "description", label: "Description", type: "textarea", fullWidth: true, placeholder: "Enter brand description" },
];

export default function BrandPage() {
  return (
    <MasterPage
      title="Brand"
      subtitle="Manage brand identities and catalogue labels."
      resourceLabel="brand"
      initialData={brands}
      columns={columns}
      formFields={formFields}
      pageSize={8}
    />
  );
}

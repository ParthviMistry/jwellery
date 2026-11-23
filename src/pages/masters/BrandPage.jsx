import React from "react";
import CatalogMasterPage from "@/components/common/CatalogMasterPage";

const fields = [
  { key: "name", label: "Name", required: true, maxLength: 150 },
  { key: "description", label: "Description", fullWidth: true },
  { key: "logo", label: "Logo URL", maxLength: 2000 },
  { key: "website", label: "Website", maxLength: 500 },
];

export default function BrandPage() {
  return <CatalogMasterPage resource="brands" title="Brand" subtitle="Manage brand identities and catalogue labels." fields={fields} />;
}

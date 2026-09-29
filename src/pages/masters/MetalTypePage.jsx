import React from "react";
import MasterPage from "@/components/common/MasterPage";
import { metalTypes } from "@/data/mock/metalTypes";

const columns = [
  { key: "id", title: "ID" },
  { key: "name", title: "Name" },
];

const formFields = [
  { key: "name", label: "Name", required: true, placeholder: "e.g. Gold" },
];

export default function MetalTypePage() {
  return (
    <MasterPage
      title="Metal Type"
      subtitle="Manage metal types used in product specifications."
      resourceLabel="metal type"
      initialData={metalTypes}
      columns={columns}
      formFields={formFields}
      pageSize={8}
    />
  );
}

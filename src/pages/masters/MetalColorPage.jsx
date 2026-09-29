import React from "react";
import MasterPage from "@/components/common/MasterPage";
import { metalColors } from "@/data/mock/metalColors";

const columns = [
  { key: "id", title: "ID" },
  { key: "name", title: "Name" },
  { key: "code", title: "Code" },
];

const formFields = [
  { key: "name", label: "Name", required: true, placeholder: "e.g. Yellow Gold" },
  { key: "code", label: "Code", required: true, placeholder: "e.g. YG" },
];

export default function MetalColorPage() {
  return (
    <MasterPage
      title="Metal Color"
      subtitle="Manage metal color variations for product design."
      resourceLabel="metal color"
      initialData={metalColors}
      columns={columns}
      formFields={formFields}
      pageSize={8}
    />
  );
}

import React from "react";
import MasterPage from "@/components/common/MasterPage";
import { metalCaret } from "@/data/mock/metalCaret";

const columns = [
  { key: "id", title: "ID" },
  { key: "name", title: "Name" },
  { key: "purity", title: "Purity" },
];

const formFields = [
  { key: "name", label: "Name", required: true, placeholder: "e.g. 18K" },
  { key: "purity", label: "Purity", required: true, placeholder: "18 Carat" },
];

export default function MetalCaretPage() {
  return (
    <MasterPage
      title="Metal Caret"
      subtitle="Track precious metal purity and karat variations."
      resourceLabel="metal caret"
      initialData={metalCaret}
      columns={columns}
      formFields={formFields}
      pageSize={8}
    />
  );
}

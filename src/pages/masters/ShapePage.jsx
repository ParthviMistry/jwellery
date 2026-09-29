import React from "react";
import MasterPage from "@/components/common/MasterPage";
import { shapes } from "@/data/mock/shapes";

const columns = [
  { key: "id", title: "ID" },
  { key: "name", title: "Name" },
  { key: "imgPath", title: "Image Path" },
];

const formFields = [
  { key: "name", label: "Name", required: true, placeholder: "e.g. Round" },
  { key: "imgPath", label: "Image Path", placeholder: "https://example.com/shape-round.png" },
];

export default function ShapePage() {
  return (
    <MasterPage
      title="Shape Master"
      subtitle="Manage stone and gemstone shape master data."
      resourceLabel="shape"
      initialData={shapes}
      columns={columns}
      formFields={formFields}
      pageSize={8}
    />
  );
}

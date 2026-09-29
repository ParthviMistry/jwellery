import React from "react";
import MasterPage from "@/components/common/MasterPage";
import { cities } from "@/data/mock/cities";

const columns = [
  { key: "id", title: "ID" },
  { key: "stateId", title: "State ID" },
  { key: "name", title: "Name" },
];

const formFields = [
  { key: "stateId", label: "State ID", required: true, placeholder: "e.g. STT-001" },
  { key: "name", label: "Name", required: true, placeholder: "e.g. Surat" },
];

export default function CityPage() {
  return (
    <MasterPage
      title="City"
      subtitle="Manage city and area master records."
      resourceLabel="city"
      initialData={cities}
      columns={columns}
      formFields={formFields}
      pageSize={8}
    />
  );
}

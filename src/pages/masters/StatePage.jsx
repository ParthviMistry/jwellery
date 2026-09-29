import React from "react";
import MasterPage from "@/components/common/MasterPage";
import { states } from "@/data/mock/states";

const columns = [
  { key: "id", title: "ID" },
  { key: "countryId", title: "Country ID" },
  { key: "name", title: "Name" },
];

const formFields = [
  { key: "countryId", label: "Country ID", required: true, placeholder: "e.g. CNT-001" },
  { key: "name", label: "Name", required: true, placeholder: "e.g. Gujarat" },
];

export default function StatePage() {
  return (
    <MasterPage
      title="State"
      subtitle="Manage state master values by country."
      resourceLabel="state"
      initialData={states}
      columns={columns}
      formFields={formFields}
      pageSize={8}
    />
  );
}

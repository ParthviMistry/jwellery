import React from "react";
import MasterPage from "@/components/common/MasterPage";
import { countries } from "@/data/mock/countries";

const columns = [
  { key: "id", title: "ID" },
  { key: "name", title: "Name" },
  { key: "code", title: "Code" },
];

const formFields = [
  { key: "name", label: "Name", required: true, placeholder: "e.g. India" },
  { key: "code", label: "Code", required: true, placeholder: "e.g. IN" },
];

export default function CountryPage() {
  return (
    <MasterPage
      title="Country"
      subtitle="Maintain global country master data."
      resourceLabel="country"
      initialData={countries}
      columns={columns}
      formFields={formFields}
      pageSize={8}
    />
  );
}

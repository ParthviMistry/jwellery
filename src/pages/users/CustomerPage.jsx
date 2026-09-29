import React from "react";
import MasterPage from "@/components/common/MasterPage";
import { customers } from "@/data/mock/customers";

const columns = [
  { key: "id", title: "ID" },
  { key: "name", title: "Name" },
  { key: "email", title: "Email" },
  { key: "type", title: "Type" },
  { key: "phoneNo", title: "Phone" },
  { key: "city", title: "City" },
];

const formFields = [
  { key: "name", label: "Name", required: true, placeholder: "Full name" },
  { key: "email", label: "Email", required: true, type: "email", placeholder: "email@example.com" },
  { key: "type", label: "Type", required: true, placeholder: "B2B / B2C" },
  { key: "phoneNo", label: "Phone", placeholder: "+91 99999 99999" },
  { key: "whatsappNo", label: "WhatsApp No", placeholder: "+91 99999 99999" },
  { key: "city", label: "City", placeholder: "Mumbai" },
];

export default function CustomerPage() {
  return (
    <MasterPage
      title="Customer"
      subtitle="Manage customer records for B2B and B2C operations."
      resourceLabel="customer"
      initialData={customers}
      columns={columns}
      formFields={formFields}
      pageSize={8}
    />
  );
}

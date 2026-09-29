import React from "react";
import MasterPage from "@/components/common/MasterPage";
import { adminUsers } from "@/data/mock/adminUsers";

const columns = [
  { key: "id", title: "ID" },
  { key: "name", title: "Name" },
  { key: "email", title: "Email" },
  { key: "userType", title: "User Type" },
  { key: "phoneNo", title: "Phone" },
];

const formFields = [
  { key: "name", label: "Name", required: true, placeholder: "Full name" },
  { key: "email", label: "Email", required: true, type: "email", placeholder: "name@example.com" },
  { key: "userType", label: "User Type", required: true, placeholder: "Admin / Supplier / OrderManagement" },
  { key: "phoneNo", label: "Phone Number", placeholder: "+91 99999 99999" },
];

export default function AdminUserPage() {
  return (
    <MasterPage
      title="Admin User"
      subtitle="Manage internal admin personnel and operational roles."
      resourceLabel="admin user"
      initialData={adminUsers}
      columns={columns}
      formFields={formFields}
      pageSize={8}
    />
  );
}

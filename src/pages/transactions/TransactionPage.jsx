import React from "react";
import MasterPage from "@/components/common/MasterPage";

export default function TransactionPage({
  title,
  subtitle,
  resourceLabel,
  initialData,
  columns,
  formFields,
}) {
  return (
    <MasterPage
      title={title}
      subtitle={subtitle}
      resourceLabel={resourceLabel}
      initialData={initialData}
      columns={columns}
      formFields={formFields}
      pageSize={8}
    />
  );
}

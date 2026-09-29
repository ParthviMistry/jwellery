import React from "react";
import TransactionPage from "@/pages/transactions/TransactionPage";
import { salesTransactions } from "@/data/mock/transactions";

const columns = [
  { key: "voucherNo", title: "Voucher No" },
  { key: "partyName", title: "Customer" },
  { key: "invoiceDate", title: "Date" },
  { key: "items", title: "Items" },
  { key: "status", title: "Status" },
  { key: "amount", title: "Amount" },
];

const formFields = [
  { key: "voucherNo", label: "Voucher No", required: true, placeholder: "SAL-1005" },
  { key: "partyName", label: "Customer Name", required: true, placeholder: "Aarav Retail" },
  { key: "invoiceDate", label: "Invoice Date", required: true, type: "date" },
  { key: "items", label: "Items Count", required: true, type: "number", placeholder: "5" },
  { key: "status", label: "Status", required: true, placeholder: "Approved" },
  { key: "amount", label: "Amount", required: true, type: "number", placeholder: "180000" },
];

export default function SalesMasterPage() {
  return (
    <TransactionPage
      title="Sales Master"
      subtitle="Manage customer sales and invoicing records."
      resourceLabel="sales entry"
      initialData={salesTransactions}
      columns={columns}
      formFields={formFields}
    />
  );
}

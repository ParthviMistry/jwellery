import React from "react";
import TransactionPage from "@/pages/transactions/TransactionPage";
import { purchaseTransactions } from "@/data/mock/transactions";

const columns = [
  { key: "voucherNo", title: "Voucher No" },
  { key: "partyName", title: "Supplier" },
  { key: "invoiceDate", title: "Date" },
  { key: "items", title: "Items" },
  { key: "status", title: "Status" },
  { key: "amount", title: "Amount" },
];

const formFields = [
  {
    key: "voucherNo",
    label: "Voucher No",
    required: true,
    placeholder: "PUR-1005",
  },
  {
    key: "partyName",
    label: "Supplier Name",
    required: true,
    placeholder: "Rajat Jewels",
  },
  { key: "invoiceDate", label: "Invoice Date", required: true, type: "date" },
  {
    key: "items",
    label: "Items Count",
    required: true,
    type: "number",
    placeholder: "4",
  },
  { key: "status", label: "Status", required: true, placeholder: "Approved" },
  {
    key: "amount",
    label: "Amount",
    required: true,
    type: "number",
    placeholder: "125000",
  },
];

export default function PurchaseMasterPage() {
  return (
    <TransactionPage
      title="Transaction > Purchase Master"
      subtitle="Manage purchase transactions and supplier stock entries."
      resourceLabel="purchase"
      initialData={purchaseTransactions}
      columns={columns}
      formFields={formFields}
    />
  );
}

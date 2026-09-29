import React from "react";
import TransactionPage from "@/pages/transactions/TransactionPage";
import { salesReturnTransactions } from "@/data/mock/transactions";

const columns = [
  { key: "voucherNo", title: "Voucher No" },
  { key: "partyName", title: "Customer" },
  { key: "invoiceDate", title: "Date" },
  { key: "items", title: "Items" },
  { key: "status", title: "Status" },
  { key: "amount", title: "Amount" },
];

const formFields = [
  { key: "voucherNo", label: "Voucher No", required: true, placeholder: "SRT-1004" },
  { key: "partyName", label: "Customer Name", required: true, placeholder: "Aarav Retail" },
  { key: "invoiceDate", label: "Return Date", required: true, type: "date" },
  { key: "items", label: "Items Count", required: true, type: "number", placeholder: "1" },
  { key: "status", label: "Status", required: true, placeholder: "Approved" },
  { key: "amount", label: "Amount", required: true, type: "number", placeholder: "15000" },
];

export default function SalesReturnMasterPage() {
  return (
    <TransactionPage
      title="Sales Return Master"
      subtitle="Track returned customer items and reversals."
      resourceLabel="sales return"
      initialData={salesReturnTransactions}
      columns={columns}
      formFields={formFields}
    />
  );
}

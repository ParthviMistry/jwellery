import React from "react";
import TransactionPage from "@/pages/transactions/TransactionPage";
import { purchaseReturnTransactions } from "@/data/mock/transactions";

const columns = [
  { key: "voucherNo", title: "Voucher No" },
  { key: "partyName", title: "Party" },
  { key: "invoiceDate", title: "Date" },
  { key: "items", title: "Items" },
  { key: "status", title: "Status" },
  { key: "amount", title: "Amount" },
];

const formFields = [
  { key: "voucherNo", label: "Voucher No", required: true, placeholder: "PRT-1004" },
  { key: "partyName", label: "Party Name", required: true, placeholder: "Golden Crest" },
  { key: "invoiceDate", label: "Return Date", required: true, type: "date" },
  { key: "items", label: "Items Count", required: true, type: "number", placeholder: "2" },
  { key: "status", label: "Status", required: true, placeholder: "Approved" },
  { key: "amount", label: "Amount", required: true, type: "number", placeholder: "20000" },
];

export default function PurchaseReturnMasterPage() {
  return (
    <TransactionPage
      title="Purchase Return Master"
      subtitle="Track supplier returns and adjustments."
      resourceLabel="purchase return"
      initialData={purchaseReturnTransactions}
      columns={columns}
      formFields={formFields}
    />
  );
}

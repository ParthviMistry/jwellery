export const purchaseTransactions = [
  { id: "TX-1001", voucherNo: "PUR-1001", partyName: "Rajat Jewels", type: "Purchase", invoiceDate: "2026-09-01", amount: 125000, status: "Approved", items: 4, isActive: true, createdAt: "2026-09-01" },
  { id: "TX-1002", voucherNo: "PUR-1002", partyName: "Golden Crest", type: "Purchase", invoiceDate: "2026-09-03", amount: 98000, status: "Pending", items: 3, isActive: true, createdAt: "2026-09-03" },
  { id: "TX-1003", voucherNo: "PUR-1003", partyName: "Mahalakshmi Mart", type: "Purchase", invoiceDate: "2026-09-08", amount: 164500, status: "Approved", items: 5, isActive: true, createdAt: "2026-09-08" },
  { id: "TX-1004", voucherNo: "PUR-1004", partyName: "Velvet Gems", type: "Purchase", invoiceDate: "2026-09-11", amount: 111200, status: "Draft", items: 2, isActive: false, createdAt: "2026-09-11" },
];

export const purchaseReturnTransactions = [
  { id: "RT-1001", voucherNo: "PRT-1001", partyName: "Rajat Jewels", type: "Purchase Return", invoiceDate: "2026-09-04", amount: 24000, status: "Approved", items: 1, isActive: true, createdAt: "2026-09-04" },
  { id: "RT-1002", voucherNo: "PRT-1002", partyName: "Rose Pearl", type: "Purchase Return", invoiceDate: "2026-09-09", amount: 17800, status: "Pending", items: 2, isActive: true, createdAt: "2026-09-09" },
  { id: "RT-1003", voucherNo: "PRT-1003", partyName: "Sapphire House", type: "Purchase Return", invoiceDate: "2026-09-14", amount: 34900, status: "Approved", items: 2, isActive: true, createdAt: "2026-09-14" },
];

export const salesTransactions = [
  { id: "SL-1001", voucherNo: "SAL-1001", partyName: "Aarav Retail", type: "Sales", invoiceDate: "2026-09-02", amount: 245000, status: "Approved", items: 6, isActive: true, createdAt: "2026-09-02" },
  { id: "SL-1002", voucherNo: "SAL-1002", partyName: "Nisha Boutique", type: "Sales", invoiceDate: "2026-09-05", amount: 189500, status: "Pending", items: 4, isActive: true, createdAt: "2026-09-05" },
  { id: "SL-1003", voucherNo: "SAL-1003", partyName: "Aurum Studio", type: "Sales", invoiceDate: "2026-09-10", amount: 320000, status: "Approved", items: 8, isActive: true, createdAt: "2026-09-10" },
  { id: "SL-1004", voucherNo: "SAL-1004", partyName: "Dazzle Emporium", type: "Sales", invoiceDate: "2026-09-13", amount: 214800, status: "Draft", items: 5, isActive: false, createdAt: "2026-09-13" },
];

export const salesReturnTransactions = [
  { id: "SR-1001", voucherNo: "SRT-1001", partyName: "Aarav Retail", type: "Sales Return", invoiceDate: "2026-09-06", amount: 27500, status: "Approved", items: 2, isActive: true, createdAt: "2026-09-06" },
  { id: "SR-1002", voucherNo: "SRT-1002", partyName: "Nisha Boutique", type: "Sales Return", invoiceDate: "2026-09-12", amount: 18400, status: "Pending", items: 1, isActive: true, createdAt: "2026-09-12" },
  { id: "SR-1003", voucherNo: "SRT-1003", partyName: "Dazzle Emporium", type: "Sales Return", invoiceDate: "2026-09-18", amount: 31600, status: "Approved", items: 2, isActive: true, createdAt: "2026-09-18" },
];

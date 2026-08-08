export const INITIAL_OPENING_BALANCES = [
  { id: 'acc-1', name: 'Cash', amount: 5000 },
  { id: 'acc-2', name: 'Bank A', amount: 15000 },
];

export const INITIAL_CATEGORIES = [
  { type: 'Receipts', name: 'Sales' },
  { type: 'Receipts', name: 'Refund' },
  { type: 'Expenses', name: 'Utilities' },
  { type: 'Expenses', name: 'Supplies' },
  { type: 'Contra', name: 'Transfer' },
];

export const INITIAL_TRANSACTIONS = [
  {
    id: 'tnx-1',
    entryDate: new Date().toISOString().slice(0, 10),
    voucherNo: 'V-001',
    type: 'Receipts',
    category: 'Sales',
    mode: 'Cash',
    withdrawnBank: 'N/A',
    depositedBank: 'Cash',
    amount: 2000,
    remarks: 'Initial sale',
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
  },
  {
    id: 'tnx-2',
    entryDate: new Date().toISOString().slice(0, 10),
    voucherNo: 'V-002',
    type: 'Expenses',
    category: 'Utilities',
    mode: 'Bank',
    withdrawnBank: 'Bank A',
    depositedBank: 'N/A',
    amount: 500,
    remarks: 'Electricity bill',
    createdAt: Date.now() - 1000 * 60 * 60 * 12,
  },
];

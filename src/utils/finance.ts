import { AccountOpeningBalance, Transaction, TransactionWithBalance, FilterOptions } from '../types';

export function sortAccountsWithCashFirst(accounts: AccountOpeningBalance[]) {
  return [...accounts].sort((a, b) => {
    if (a.name.toLowerCase() === 'cash') return -1;
    if (b.name.toLowerCase() === 'cash') return 1;
    return a.name.localeCompare(b.name);
  });
}

export function calculateTransactionsWithRunningBalance(
  transactions: Transaction[],
  accounts: AccountOpeningBalance[]
): TransactionWithBalance[] {
  // For simplicity, compute a global running balance across all accounts.
  let balanceMap: Record<string, number> = {};
  accounts.forEach((a) => (balanceMap[a.name] = a.amount));

  const sorted = [...transactions].sort((a, b) => a.createdAt - b.createdAt);
  const result: TransactionWithBalance[] = [];

  for (const t of sorted) {
    // apply transaction to appropriate account balances
    if (t.mode === 'Cash' || t.depositedBank === 'Cash' || t.withdrawnBank === 'Cash') {
      const acc = t.depositedBank === 'Cash' || t.mode === 'Cash' ? 'Cash' : t.withdrawnBank;
      balanceMap[acc] = (balanceMap[acc] || 0) + (t.type === 'Receipts' ? t.amount : -t.amount);
      result.push({ ...t, balanceAmount: balanceMap[acc] });
    } else if (t.mode === 'Bank' || t.depositedBank !== 'N/A' || t.withdrawnBank !== 'N/A') {
      const accName = t.depositedBank !== 'N/A' ? t.depositedBank : t.withdrawnBank;
      balanceMap[accName] = (balanceMap[accName] || 0) + (t.type === 'Receipts' ? t.amount : -t.amount);
      result.push({ ...t, balanceAmount: balanceMap[accName] });
    } else {
      // fallback: global sum
      const global = Object.values(balanceMap).reduce((s, v) => s + v, 0) + (t.type === 'Receipts' ? t.amount : -t.amount);
      result.push({ ...t, balanceAmount: global });
    }
  }

  // Return newest-first (App expects whatever but table can handle it)
  return result.reverse();
}

export function exportToCSV(transactions: TransactionWithBalance[], accounts: AccountOpeningBalance[]) {
  const headers = ['Entry Date', 'Voucher', 'Type', 'Category', 'Mode', 'Withdrawn', 'Deposited', 'Amount', 'Balance', 'Remarks'];
  const rows = transactions.map((t) => [
    t.entryDate,
    t.voucherNo,
    t.type,
    t.category,
    t.mode,
    t.withdrawnBank,
    t.depositedBank,
    t.amount.toString(),
    t.balanceAmount?.toString() ?? '',
    t.remarks,
  ]);

  const csvContent = [headers, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'transactions.csv';
  a.click();
  URL.revokeObjectURL(url);
}

export function filterTransactions(transactions: TransactionWithBalance[], filters: FilterOptions) {
  return transactions.filter((t) => {
    if (filters.type && filters.type !== 'All' && t.type !== (filters.type as any)) return false;
    if (filters.category && filters.category !== 'All' && t.category !== filters.category) return false;
    if (filters.account && filters.account !== 'All') {
      if (t.withdrawnBank !== filters.account && t.depositedBank !== filters.account && t.mode !== filters.account) return false;
    }
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      const hay = `${t.voucherNo} ${t.category} ${t.remarks} ${t.entryDate}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (filters.startDate) {
      if (t.entryDate < filters.startDate) return false;
    }
    if (filters.endDate) {
      if (t.entryDate > filters.endDate) return false;
    }
    if (filters.minAmount) {
      if (t.amount < Number(filters.minAmount)) return false;
    }
    if (filters.maxAmount) {
      if (t.amount > Number(filters.maxAmount)) return false;
    }
    return true;
  });
}

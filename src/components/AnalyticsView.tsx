import React from 'react';
import { Transaction } from '../types';

interface Props {
  transactions: Transaction[];
  accounts: any[];
}

export const AnalyticsView: React.FC<Props> = ({ transactions, accounts }) => {
  const totalReceipts = transactions.filter(t => t.type === 'Receipts').reduce((s,n) => s + n.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'Expenses').reduce((s,n) => s + n.amount, 0);
  return (
    <div className="space-y-4">
      <div className="bg-white p-4 border rounded">Total Receipts: {totalReceipts.toLocaleString()}</div>
      <div className="bg-white p-4 border rounded">Total Expenses: {totalExpenses.toLocaleString()}</div>
      <div className="bg-white p-4 border rounded">Accounts: {accounts.length}</div>
    </div>
  );
};

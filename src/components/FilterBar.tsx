import React from 'react';
import { FilterOptions, TransactionType } from '../types';
import { AccountOpeningBalance } from '../types';

interface Props {
  filters: FilterOptions;
  setFilters: (f: FilterOptions) => void;
  accounts: AccountOpeningBalance[];
  totalFilteredCount: number;
  totalAllCount: number;
  onClearFilters: () => void;
  customCategories: { type: TransactionType; name: string }[];
  allTransactions: any[];
  onOpenCategoryManager: () => void;
  onOpenBankManager: () => void;
}

export const FilterBar: React.FC<Props> = ({ filters, setFilters, accounts, totalFilteredCount, totalAllCount, onClearFilters, customCategories, onOpenCategoryManager, onOpenBankManager }) => {
  return (
    <div className="bg-white border p-4 rounded">
      <div className="flex flex-col sm:flex-row gap-2">
        <input value={filters.searchQuery} onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })} placeholder="Search..." className="flex-1 p-2 border rounded" />
        <select value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })} className="p-2 border rounded">
          <option>All</option>
          <option>Receipts</option>
          <option>Expenses</option>
          <option>Contra</option>
        </select>
        <select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })} className="p-2 border rounded">
          <option>All</option>
          {customCategories.map((c) => <option key={c.type + c.name}>{c.name}</option>)}
        </select>
        <select value={filters.account} onChange={(e) => setFilters({ ...filters, account: e.target.value })} className="p-2 border rounded">
          <option>All</option>
          {accounts.map((a) => <option key={a.id}>{a.name}</option>)}
        </select>
        <div className="flex items-center gap-2">
          <button onClick={onOpenCategoryManager} className="px-3 py-2 border rounded text-xs">Manage Categories</button>
          <button onClick={onOpenBankManager} className="px-3 py-2 border rounded text-xs">Manage Banks</button>
        </div>
      </div>
      <div className="mt-2 text-xs text-slate-500">Showing {totalFilteredCount} of {totalAllCount}</div>
    </div>
  );
};

import React from 'react';
import { AccountOpeningBalance, Transaction } from '../types';

interface Props {
  accounts: AccountOpeningBalance[];
  transactions: Transaction[];
  selectedAccountFilter: string;
  onSelectAccountFilter: (name: string) => void;
}

export const AccountSummaryCards: React.FC<Props> = ({ accounts, transactions, selectedAccountFilter, onSelectAccountFilter }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {accounts.map((a) => (
        <div key={a.id} className={`p-4 bg-white border rounded ${selectedAccountFilter === a.name ? 'ring-2 ring-indigo-300' : ''}`}>
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xs text-slate-500">{a.name}</div>
              <div className="font-bold text-lg">{a.amount.toLocaleString()}</div>
            </div>
            <button onClick={() => onSelectAccountFilter(a.name)} className="text-sm text-indigo-600">View</button>
          </div>
        </div>
      ))}
    </div>
  );
};

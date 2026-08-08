import React from 'react';
import { Transaction, AccountOpeningBalance } from '../types';

interface Props { transactions: Transaction[]; accounts: AccountOpeningBalance[]; categories: any[] }
export const StatementView: React.FC<Props> = ({ transactions, accounts }) => {
  return (
    <div className="space-y-4">
      <div className="bg-white p-4 border rounded">Statement (simple view)</div>
      <div className="bg-white p-4 border rounded max-h-72 overflow-auto">
        {transactions.map(t => (
          <div key={t.id} className="border-b py-2">
            <div className="text-sm">{t.entryDate} — {t.voucherNo} — {t.category} — {t.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

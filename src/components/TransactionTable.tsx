import React from 'react';
import { TransactionWithBalance } from '../types';

interface Props {
  transactions: TransactionWithBalance[];
  headerConfig: any;
  onEdit: (t: any) => void;
  onDelete: (id: string) => void;
  onOpenAddModal: () => void;
}

export const TransactionTable: React.FC<Props> = ({ transactions, headerConfig, onEdit, onDelete, onOpenAddModal }) => {
  return (
    <div className="bg-white border rounded overflow-auto">
      <div className="p-3 border-b flex justify-between items-center">
        <div>
          <div className="font-bold">{headerConfig?.title ?? 'Transaction Register'}</div>
          <div className="text-xs text-slate-500">{headerConfig?.subtitle}</div>
        </div>
        <div>
          <button onClick={onOpenAddModal} className="px-3 py-1 bg-indigo-600 text-white rounded text-sm">Add</button>
        </div>
      </div>
      <table className="w-full text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">Voucher</th>
            <th className="p-2 text-left">Type</th>
            <th className="p-2 text-left">Category</th>
            <th className="p-2 text-right">Amount</th>
            <th className="p-2 text-right">Balance</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id} className="border-b">
              <td className="p-2">{t.entryDate}</td>
              <td className="p-2">{t.voucherNo}</td>
              <td className="p-2">{t.type}</td>
              <td className="p-2">{t.category}</td>
              <td className="p-2 text-right">{t.amount.toLocaleString()}</td>
              <td className="p-2 text-right">{t.balanceAmount?.toLocaleString()}</td>
              <td className="p-2 text-center">
                <button onClick={() => onEdit(t)} className="text-xs text-indigo-600 mr-2">Edit</button>
                <button onClick={() => onDelete(t.id)} className="text-xs text-rose-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

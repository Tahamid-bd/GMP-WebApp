import React, { useState, useEffect } from 'react';
import { Transaction, AccountOpeningBalance, TransactionType } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  editingTransaction: Transaction | null;
  allTransactions: Transaction[];
  accounts: AccountOpeningBalance[];
  initialAccount: string;
  customCategories: { type: TransactionType; name: string }[];
}

export const TransactionModal: React.FC<Props> = ({ isOpen, onClose, onSave, editingTransaction, accounts, initialAccount, customCategories }) => {
  const [form, setForm] = useState<any>({
    entryDate: new Date().toISOString().slice(0,10),
    voucherNo: '',
    type: 'Receipts',
    category: customCategories[0]?.name ?? '',
    mode: 'Cash',
    withdrawnBank: 'N/A',
    depositedBank: 'N/A',
    amount: 0,
    remarks: '',
    id: undefined,
  });

  useEffect(() => {
    if (editingTransaction) setForm(editingTransaction);
    else setForm((f:any) => ({ ...f, depositedBank: initialAccount === 'All' ? 'Cash' : initialAccount }));
  }, [editingTransaction, initialAccount, customCategories]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded p-4 w-full max-w-md">
        <h3 className="font-bold mb-2">{form.id ? 'Edit Transaction' : 'New Transaction'}</h3>
        <div className="space-y-2">
          <input type="date" value={form.entryDate} onChange={(e) => setForm({ ...form, entryDate: e.target.value })} className="w-full p-2 border rounded" />
          <input placeholder="Voucher No" value={form.voucherNo} onChange={(e) => setForm({ ...form, voucherNo: e.target.value })} className="w-full p-2 border rounded" />
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full p-2 border rounded">
            <option>Receipts</option>
            <option>Expenses</option>
            <option>Contra</option>
          </select>
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full p-2 border rounded">
            {customCategories.map((c) => <option key={c.name}>{c.name}</option>)}
          </select>
          <input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })} className="w-full p-2 border rounded" />
          <input placeholder="Remarks" value={form.remarks} onChange={(e) => setForm({ ...form, remarks: e.target.value })} className="w-full p-2 border rounded" />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
          <button onClick={() => { onSave({ ...form, id: form.id ?? 'tnx-'+Date.now(), createdAt: form.createdAt ?? Date.now() }); onClose(); }} className="px-3 py-1 bg-indigo-600 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

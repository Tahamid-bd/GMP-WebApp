import React, { useState } from 'react';
import { TransactionType } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  customCategories: { type: TransactionType; name: string }[];
  onAddCustomCategory: (type: TransactionType, name: string) => void;
  onDeleteCustomCategory: (type: TransactionType, name: string) => void;
  onEditCustomCategory: (type: TransactionType, oldName: string, newName: string) => void;
}

export const CategoryManagerModal: React.FC<Props> = ({ isOpen, onClose, customCategories, onAddCustomCategory, onDeleteCustomCategory, onEditCustomCategory }) => {
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState<TransactionType>('Receipts');
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded p-4 w-full max-w-md">
        <h3 className="font-bold mb-2">Categories</h3>
        <div className="space-y-2 max-h-48 overflow-auto">
          {customCategories.map((c) => (
            <div key={c.type + c.name} className="flex justify-between items-center">
              <div>{c.type} — {c.name}</div>
              <div>
                <button onClick={() => onDeleteCustomCategory(c.type, c.name)} className="text-xs text-rose-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2 flex gap-2">
          <select value={newType} onChange={(e) => setNewType(e.target.value as TransactionType)} className="p-2 border rounded">
            <option>Receipts</option>
            <option>Expenses</option>
            <option>Contra</option>
          </select>
          <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="New category" className="flex-1 p-2 border rounded" />
          <button onClick={() => { if (newName.trim()) { onAddCustomCategory(newType, newName.trim()); setNewName(''); } }} className="px-3 py-1 bg-indigo-600 text-white rounded">Add</button>
        </div>
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="px-3 py-1 border rounded">Close</button>
        </div>
      </div>
    </div>
  );
};

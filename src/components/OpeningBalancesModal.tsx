import React, { useState } from 'react';
import { AccountOpeningBalance } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  accounts: AccountOpeningBalance[];
  onSaveAccounts: (accounts: AccountOpeningBalance[]) => void;
}

export const OpeningBalancesModal: React.FC<Props> = ({ isOpen, onClose, accounts, onSaveAccounts }) => {
  const [local, setLocal] = useState(accounts);
  React.useEffect(() => setLocal(accounts), [accounts]);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded p-4 w-full max-w-lg">
        <h3 className="font-bold mb-2">Opening Balances</h3>
        <div className="space-y-2 max-h-60 overflow-auto">
          {local.map((a, idx) => (
            <div key={a.id} className="flex gap-2">
              <input value={a.name} onChange={(e) => setLocal(local.map((x,i)=>i===idx?{...x,name:e.target.value}:x))} className="flex-1 p-2 border rounded" />
              <input type="number" value={a.amount} onChange={(e) => setLocal(local.map((x,i)=>i===idx?{...x,amount:Number(e.target.value)}:x))} className="w-32 p-2 border rounded" />
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
          <button onClick={() => { onSaveAccounts(local); onClose(); }} className="px-3 py-1 bg-indigo-600 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

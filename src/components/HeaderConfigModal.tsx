import React from 'react';
import { AccountOpeningBalance } from '../types';

export interface HeaderConfig {
  title: string;
  subtitle?: string;
  logoUrl?: string;
  isEnabled?: boolean;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  headerConfig: HeaderConfig;
  onSave: (cfg: HeaderConfig) => void;
}

export const HeaderConfigModal: React.FC<Props> = ({ isOpen, onClose, headerConfig, onSave }) => {
  const [local, setLocal] = React.useState<HeaderConfig>(headerConfig);
  React.useEffect(() => setLocal(headerConfig), [headerConfig]);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded p-4 w-full max-w-md">
        <h3 className="font-bold mb-2">Header Config</h3>
        <input value={local.title} onChange={(e) => setLocal({ ...local, title: e.target.value })} className="w-full p-2 border rounded mb-2" />
        <input value={local.subtitle} onChange={(e) => setLocal({ ...local, subtitle: e.target.value })} className="w-full p-2 border rounded mb-2" />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
          <button onClick={() => { onSave(local); onClose(); }} className="px-3 py-1 bg-indigo-600 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

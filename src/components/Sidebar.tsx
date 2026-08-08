import React from 'react';
import { ViewTab } from '../types';

interface SidebarProps {
  activeTab: ViewTab;
  setActiveTab: (tab: ViewTab) => void;
  onOpenAddModal: () => void;
  onOpenOpeningModal: () => void;
  onOpenCategoryModal: () => void;
  onResetData: () => void;
  transactionCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onOpenAddModal, onOpenOpeningModal, onOpenCategoryModal, onResetData, transactionCount }) => {
  return (
    <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold">Menu</h2>
        <button onClick={onResetData} className="text-xs text-rose-600">Reset</button>
      </div>

      <nav className="space-y-2">
        <button onClick={() => setActiveTab('register')} className={`w-full text-left px-3 py-2 rounded ${activeTab === 'register' ? 'bg-indigo-600 text-white' : 'bg-slate-50'}`}>Register ({transactionCount})</button>
        <button onClick={() => setActiveTab('accounts')} className={`w-full text-left px-3 py-2 rounded ${activeTab === 'accounts' ? 'bg-indigo-600 text-white' : 'bg-slate-50'}`}>Bank & Cash</button>
        <button onClick={() => setActiveTab('statement')} className={`w-full text-left px-3 py-2 rounded ${activeTab === 'statement' ? 'bg-indigo-600 text-white' : 'bg-slate-50'}`}>R & P Statement</button>
        <button onClick={() => setActiveTab('analytics')} className={`w-full text-left px-3 py-2 rounded ${activeTab === 'analytics' ? 'bg-indigo-600 text-white' : 'bg-slate-50'}`}>Analytics</button>
      </nav>

      <div className="pt-4 border-t">
        <button onClick={onOpenAddModal} className="w-full px-3 py-2 bg-indigo-600 text-white rounded">Add Transaction</button>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button onClick={onOpenOpeningModal} className="text-xs px-2 py-1 border rounded">Accounts</button>
          <button onClick={onOpenCategoryModal} className="text-xs px-2 py-1 border rounded">Categories</button>
        </div>
      </div>
    </aside>
  );
};

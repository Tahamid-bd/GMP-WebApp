import React from 'react';
import { ViewTab } from '../types';

interface Props { activeTab: ViewTab }
export const TopHeader: React.FC<Props> = ({ activeTab }) => {
  return (
    <div className="bg-white border-b border-slate-200 p-4">
      <div className="max-w-7xl mx-auto">
        <h3 className="font-bold">{activeTab === 'register' ? 'Transaction Register' : activeTab === 'accounts' ? 'Accounts' : activeTab === 'analytics' ? 'Analytics' : 'Statement'}</h3>
      </div>
    </div>
  );
};

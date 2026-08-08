import React from 'react';

interface Props {
  transactions: any[];
  onTransactionsUpdated?: (t:any[]) => void;
}

export const GoogleSyncWidget: React.FC<Props> = ({ transactions, onTransactionsUpdated }) => {
  return (
    <div className="bg-yellow-50 border border-yellow-100 p-3 rounded text-sm">
      Google Sync is not configured in this preview. Enable it in settings to push/pull to Google Sheets.
    </div>
  );
};

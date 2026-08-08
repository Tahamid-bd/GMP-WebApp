export interface SyncConfig {
  autoSyncEnabled: boolean;
  spreadsheetId?: string;
}

export function getStoredSyncConfig(): SyncConfig {
  try {
    const raw = localStorage.getItem('gss_sync_config_v1');
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // ignore
  }
  return { autoSyncEnabled: false };
}

export async function pushTransactionsToSheet(spreadsheetId: string, transactions: any[]) {
  // Stub: pretend to push and resolve
  console.info('pushTransactionsToSheet stub called', spreadsheetId, transactions.length);
  return Promise.resolve({ success: true });
}

export async function performFullSync(transactions: any[]) {
  // Stub: pretend merge found none
  return Promise.resolve({ mergedTransactions: transactions });
}

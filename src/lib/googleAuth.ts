export function initAuth(onUser: (user: any | null) => void) {
  // Stubbed auth: call onUser(null) immediately and return unsubscribe
  setTimeout(() => onUser(null), 0);
  return () => {};
}

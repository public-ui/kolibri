/**
 * Returns the text of every logged message. The hint helpers log an array whose first entry is the
 * message; the logger itself is called with plain values as well.
 */
export const getLoggedMessages = (calls: unknown[][]): string[] => calls.map(([message]) => String(Array.isArray(message) ? message[0] : message));

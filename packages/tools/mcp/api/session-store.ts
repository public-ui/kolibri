import type { Server } from '@modelcontextprotocol/sdk/server/index.js';
import type { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';

export interface McpSessionRecord {
	server: Server;
	transport: SSEServerTransport;
}

const SESSION_STORE_SYMBOL = Symbol.for('kolibri.mcp.sessionStore');

type GlobalWithSessionStore = typeof globalThis & {
	[SESSION_STORE_SYMBOL]?: Map<string, McpSessionRecord>;
};

function getSessionStore(): Map<string, McpSessionRecord> {
	const globalScope = globalThis as GlobalWithSessionStore;

	if (!globalScope[SESSION_STORE_SYMBOL]) {
		globalScope[SESSION_STORE_SYMBOL] = new Map<string, McpSessionRecord>();
	}

	return globalScope[SESSION_STORE_SYMBOL]!;
}

export function setSession(sessionId: string, record: McpSessionRecord): void {
	getSessionStore().set(sessionId, record);
}

export function getSession(sessionId: string): McpSessionRecord | undefined {
	return getSessionStore().get(sessionId);
}

export function deleteSession(sessionId: string): void {
	getSessionStore().delete(sessionId);
}

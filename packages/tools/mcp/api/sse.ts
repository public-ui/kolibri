import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createKolibriMcpServer } from '../dist/index.mjs';
import { deleteSession, setSession } from './session-store.js';

const MESSAGE_ENDPOINT = '/api/message';

function setCorsHeaders(res: VercelResponse): void {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Mcp-Session-Id');
	res.setHeader('Access-Control-Expose-Headers', 'Mcp-Session-Id');
	res.setHeader('X-Accel-Buffering', 'no');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
	setCorsHeaders(res);

	if (req.method === 'OPTIONS') {
		res.status(204).end();
		return;
	}

	if (req.method !== 'GET') {
		res.status(405).json({ error: 'Method not allowed. Use GET for SSE connection.' });
		return;
	}

	let sessionId: string | null = null;
	let cleanupRequested = false;
	let server: ReturnType<typeof createKolibriMcpServer> | null = null;
	let transport: SSEServerTransport | null = null;

	try {
		server = createKolibriMcpServer();
		transport = new SSEServerTransport(MESSAGE_ENDPOINT, res);

		sessionId = transport.sessionId;
		res.setHeader('Mcp-Session-Id', sessionId);

		server.onclose = () => {
			if (sessionId) {
				deleteSession(sessionId);
				if (!cleanupRequested) {
					console.log(`[api/sse] Session ${sessionId} closed`);
				}
			}
		};

		transport.onerror = (error) => {
			if (sessionId) {
				console.error(`[api/sse] Transport error for session ${sessionId}`, error);
			} else {
				console.error('[api/sse] Transport error before session established', error);
			}
		};

		setSession(transport.sessionId, { server, transport });

		await server.connect(transport);

		console.log(`[api/sse] Session ${transport.sessionId} connected`);
	} catch (error) {
		cleanupRequested = true;
		if (sessionId) {
			deleteSession(sessionId);
		}

		if (server) {
			await server.close().catch((closeError) => {
				console.error('[api/sse] Failed to close server after error', closeError);
			});
		}

		console.error('[api/sse] Error establishing SSE connection', error);

		if (!res.headersSent) {
			res.status(500).json({ error: 'Failed to establish SSE connection' });
		} else {
			res.end();
		}
	}
}

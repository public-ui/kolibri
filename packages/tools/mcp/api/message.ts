import type { AuthInfo } from '@modelcontextprotocol/sdk/server/auth/types.js';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { IncomingMessage } from 'node:http';
import { getSession } from './session-store.js';

const SESSION_HEADER = 'mcp-session-id';
const SESSION_QUERY_KEY = 'sessionId';

type MessageRequest = IncomingMessage & { auth?: AuthInfo };

type HeaderValue = string | string[] | undefined;

type QueryValue = string | string[] | string[][] | undefined;

function setCorsHeaders(res: VercelResponse): void {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Mcp-Session-Id');
	res.setHeader('Access-Control-Expose-Headers', 'Mcp-Session-Id');
	res.setHeader('Cache-Control', 'no-store');
}

function pickFirstValue(value: HeaderValue | QueryValue): string | undefined {
	if (Array.isArray(value)) {
		for (const entry of value) {
			if (Array.isArray(entry)) {
				const nested = pickFirstValue(entry);
				if (nested) {
					return nested;
				}
				continue;
			}

			if (entry && entry.trim().length > 0) {
				return entry;
			}
		}
		return undefined;
	}

	if (typeof value === 'string' && value.trim().length > 0) {
		return value;
	}

	return undefined;
}

function resolveSessionId(req: VercelRequest): string | undefined {
	const headerValue = pickFirstValue(req.headers[SESSION_HEADER]);
	if (headerValue) {
		return headerValue;
	}

	const queryValue = pickFirstValue(req.query?.[SESSION_QUERY_KEY] as QueryValue);
	if (queryValue) {
		return queryValue;
	}

	return undefined;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
	setCorsHeaders(res);

	if (req.method === 'OPTIONS') {
		res.status(204).end();
		return;
	}

	if (req.method !== 'POST') {
		res.status(405).json({ error: 'Method not allowed. Use POST to send messages.' });
		return;
	}

	const sessionId = resolveSessionId(req);

	if (!sessionId) {
		res.status(400).json({
			error: 'Missing session identifier. Connect to /api/sse first and reuse the provided sessionId.',
		});
		return;
	}

	const session = getSession(sessionId);

	if (!session) {
		res.status(404).json({
			error: `Unknown session: ${sessionId}. Establish a new SSE connection first.`,
		});
		return;
	}

	res.setHeader('Mcp-Session-Id', sessionId);

	try {
		await session.transport.handlePostMessage(req as MessageRequest, res, req.body);
	} catch (error) {
		console.error(`[api/message] Failed to handle message for session ${sessionId}`, error);
		if (!res.headersSent) {
			res.status(500).json({ error: 'Failed to process message' });
		}
	}
}

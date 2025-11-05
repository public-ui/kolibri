import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Message Endpoint for MCP Server
 * POST /api/message - Receives JSON-RPC messages from client via SSE transport
 *
 * Note: This endpoint is handled by the SSEServerTransport in api/sse.ts
 * The SDK automatically routes messages through this endpoint.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
	// CORS headers
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	if (req.method === 'OPTIONS') {
		return res.status(204).end();
	}

	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed. Use POST to send messages.' });
	}

	// Messages are handled by the SSEServerTransport
	// This endpoint should not be called directly
	// The SSE transport in api/sse.ts manages the message flow

	return res.status(200).json({
		jsonrpc: '2.0',
		id: req.body?.id ?? null,
		error: {
			code: -32601,
			message: 'Message endpoint should be used via SSE connection. Connect to /api/sse first.',
		},
	});
}

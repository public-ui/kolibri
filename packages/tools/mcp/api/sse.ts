import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * SSE Endpoint for MCP Server
 * GET /api/sse - Establishes SSE connection
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
	// Only allow GET requests for SSE
	if (req.method !== 'GET') {
		return res.status(405).json({ error: 'Method not allowed. Use GET for SSE connection.' });
	}

	// Set SSE headers
	res.setHeader('Content-Type', 'text/event-stream');
	res.setHeader('Cache-Control', 'no-cache, no-transform');
	res.setHeader('Connection', 'keep-alive');
	res.setHeader('X-Accel-Buffering', 'no');

	// CORS headers
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	// Send initial connection event
	res.write(`data: ${JSON.stringify({ type: 'connected', timestamp: new Date().toISOString() })}\n\n`);

	// Send endpoint information
	const endpointInfo = {
		type: 'endpoint',
		message: 'SSE endpoint connected',
		messageEndpoint: '/api/message',
		version: '1.0.0',
	};
	res.write(`data: ${JSON.stringify(endpointInfo)}\n\n`);

	// Keep connection alive with periodic pings
	const keepAliveInterval = setInterval(() => {
		res.write(`: keepalive\n\n`);
	}, 30000);

	// Clean up on connection close
	req.on('close', () => {
		clearInterval(keepAliveInterval);
		res.end();
	});
}

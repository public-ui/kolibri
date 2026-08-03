import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { createKolibriMcpServer } from '../dist/mcp.mjs';

// Vercel serverless function handler
export default async function handler(req, res) {
	// Handle CORS preflight
	if (req.method === 'OPTIONS') {
		res.status(200).end();
		return;
	}

	// Only allow POST requests
	if (req.method !== 'POST') {
		res.status(405).json({ error: 'Method not allowed' });
		return;
	}

	try {
		// Create server instance (reuses the same createKolibriMcpServer from the build)
		const server = await createKolibriMcpServer();

		// Create transport for this request
		const transport = new StreamableHTTPServerTransport({
			sessionIdGenerator: undefined,
			enableJsonResponse: true,
		});

		// Connect server to transport
		await server.connect(transport);

		// Handle the MCP request
		await transport.handleRequest(req, res, req.body);
	} catch (error) {
		console.error('MCP request error:', error);
		res.status(500).json({
			error: 'Internal server error',
			message: error instanceof Error ? error.message : 'Unknown error',
		});
	}
}

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createKolibriMcpServer } from '../dist/mcp-server.mjs';

// Store active MCP server instance
let mcpServer: ReturnType<typeof createKolibriMcpServer> | null = null;

function getMcpServer() {
	if (!mcpServer) {
		mcpServer = createKolibriMcpServer();
	}
	return mcpServer;
}

/**
 * Message Endpoint for MCP Server
 * POST /api/message - Receives JSON-RPC messages from client
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
	// Only allow POST requests
	if (req.method === 'OPTIONS') {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
		return res.status(204).end();
	}

	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed. Use POST to send messages.' });
	}

	// CORS headers
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Content-Type', 'application/json');

	try {
		const server = getMcpServer();
		const message = req.body;

		// Validate JSON-RPC message
		if (!message || typeof message !== 'object' || !message.method) {
			return res.status(400).json({
				jsonrpc: '2.0',
				id: message?.id ?? null,
				error: {
					code: -32600,
					message: 'Invalid Request',
				},
			});
		}

		// Handle the request using the MCP server
		// Note: In a real implementation, this would need proper request routing
		// For now, we'll return a basic response structure

		let result;

		if (message.method === 'tools/list') {
			// List available tools
			const tools = [
				{
					name: 'hello_kolibri',
					description: 'A simple test tool that returns a greeting from KoliBri',
					inputSchema: {
						type: 'object',
						properties: {
							name: {
								type: 'string',
								description: 'The name to greet',
							},
						},
					},
				},
				{
					name: 'search',
					description: 'Search for KoliBri component samples and documentation',
					inputSchema: {
						type: 'object',
						properties: {
							query: { type: 'string', description: 'Search query' },
							kind: { type: 'string', enum: ['sample', 'doc'] },
							limit: { type: 'number' },
						},
						required: ['query'],
					},
				},
				{
					name: 'get_entry',
					description: 'Get a specific entry by ID',
					inputSchema: {
						type: 'object',
						properties: {
							id: { type: 'string', description: 'Entry ID' },
						},
						required: ['id'],
					},
				},
			];

			result = { tools };
		} else if (message.method === 'tools/call') {
			// Handle tool calls
			const { name, arguments: args } = message.params || {};

			if (name === 'hello_kolibri') {
				const userName = args?.name || 'World';
				result = {
					content: [
						{
							type: 'text',
							text: `Hello ${userName}! This is KoliBri MCP Server via SSE on Vercel.`,
						},
					],
				};
			} else {
				throw new Error(`Unknown tool: ${name}`);
			}
		} else {
			throw new Error(`Unsupported method: ${message.method}`);
		}

		// Send JSON-RPC response
		return res.status(200).json({
			jsonrpc: '2.0',
			id: message.id,
			result,
		});
	} catch (error) {
		console.error('[api/message] Error:', error);

		return res.status(200).json({
			jsonrpc: '2.0',
			id: req.body?.id ?? null,
			error: {
				code: -32603,
				message: error instanceof Error ? error.message : 'Internal error',
			},
		});
	}
}

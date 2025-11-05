import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getAllEntries, getEntryById } from '../dist/data.mjs';
import { searchEntries } from '../dist/search.mjs';

// Global MCP Server instance
let mcpServer: Server | null = null;

function getMcpServer(): Server {
	if (!mcpServer) {
		mcpServer = new Server(
			{
				name: '@public-ui/mcp',
				version: '1.0.0',
			},
			{
				capabilities: {
					tools: {},
				},
			},
		);

		// Register tools/list handler
		mcpServer.setRequestHandler(ListToolsRequestSchema, async () => {
			return {
				tools: [
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
						description: 'Search for KoliBri component samples and documentation using fuzzy search',
						inputSchema: {
							type: 'object',
							properties: {
								query: {
									type: 'string',
									description: 'Search query to find samples or docs',
								},
								kind: {
									type: 'string',
									enum: ['sample', 'doc'],
									description: 'Filter by kind: "sample" for component examples or "doc" for documentation',
								},
								limit: {
									type: 'number',
									description: 'Maximum number of results to return (default: 10)',
								},
							},
							required: ['query'],
						},
					},
					{
						name: 'get_entry',
						description: 'Get a specific sample or documentation entry by its ID',
						inputSchema: {
							type: 'object',
							properties: {
								id: {
									type: 'string',
									description: 'Entry ID (e.g., "button/basic" or "docs/getting-started")',
								},
							},
							required: ['id'],
						},
					},
				],
			};
		});

		// Register tools/call handler
		mcpServer.setRequestHandler(CallToolRequestSchema, async (request) => {
			const { name, arguments: args } = request.params;

			if (name === 'hello_kolibri') {
				const userName = (args as { name?: string })?.name ?? 'World';
				return {
					content: [
						{
							type: 'text',
							text: `Hello ${userName}! This is KoliBri MCP Server via SSE on Vercel.`,
						},
					],
				};
			}

			if (name === 'search') {
				const { query, kind, limit } = args as { query: string; kind?: 'sample' | 'doc'; limit?: number };

				if (!query || query.trim().length === 0) {
					return {
						content: [
							{
								type: 'text',
								text: 'Error: Query parameter is required and cannot be empty',
							},
						],
					};
				}

				const allEntries = getAllEntries();
				const results = searchEntries(allEntries, query, {
					kind,
					limit: limit ?? 10,
				});

				const resultText = results.map((result: { item: any; score: number; refIndex: number }) => {
					const { item, score } = result;
					return `- [${item.kind}] ${item.id}: ${item.name}\n  Description: ${item.description ?? 'N/A'}\n  Match score: ${(score * 100).toFixed(1)}%\n  Tags: ${item.tags?.join(', ') ?? 'none'}`;
				});

				return {
					content: [
						{
							type: 'text',
							text: `Found ${results.length} result(s) for "${query}":\n\n${resultText.join('\n\n')}`,
						},
					],
				};
			}

			if (name === 'get_entry') {
				const { id } = args as { id: string };

				if (!id) {
					return {
						content: [
							{
								type: 'text',
								text: 'Error: ID parameter is required',
							},
						],
					};
				}

				const entry = getEntryById(id);

				if (!entry) {
					return {
						content: [
							{
								type: 'text',
								text: `Error: Entry with ID "${id}" not found`,
							},
						],
					};
				}

				return {
					content: [
						{
							type: 'text',
							text: `# ${entry.name}\n\nID: ${entry.id}\nKind: ${entry.kind}\nGroup: ${entry.group ?? 'N/A'}\nDescription: ${entry.description ?? 'N/A'}\nTags: ${entry.tags?.join(', ') ?? 'none'}\n\n## Code\n\n\`\`\`\n${entry.code ?? 'No code available'}\n\`\`\``,
						},
					],
				};
			}

			throw new Error(`Unknown tool: ${name}`);
		});
	}

	return mcpServer;
}

/**
 * SSE Endpoint for MCP Server
 * GET /api/sse - Establishes SSE connection with MCP protocol
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
	// Only allow GET requests for SSE
	if (req.method !== 'GET') {
		return res.status(405).json({ error: 'Method not allowed. Use GET for SSE connection.' });
	}

	// CORS headers
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	try {
		const server = getMcpServer();

		// Create SSE transport
		const transport = new SSEServerTransport('/api/message', res);

		// Connect server to transport
		await server.connect(transport);

		console.log('[api/sse] MCP Server connected via SSE');
	} catch (error) {
		console.error('[api/sse] Error:', error);
		res.status(500).json({ error: 'Failed to establish SSE connection' });
	}
}

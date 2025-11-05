import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { createRequire } from 'node:module';
import { getAllEntries, getEntryById, getSampleIndexMetadata } from './data.js';
import { searchEntries } from './search.js';

const require = createRequire(import.meta.url);
const {
	version: PACKAGE_VERSION = '0.0.0',
	name: PACKAGE_NAME = '@public-ui/mcp',
	description: PACKAGE_DESCRIPTION,
} = require('../package.json') as {
	version?: string;
	name?: string;
	description?: string;
};

export function createKolibriMcpServer(): Server {
	const server = new Server(
		{
			name: PACKAGE_NAME,
			version: PACKAGE_VERSION,
		},
		{
			capabilities: {
				tools: {},
			},
		},
	);

	server.setRequestHandler(ListToolsRequestSchema, async () => {
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

	server.setRequestHandler(CallToolRequestSchema, async (request) => {
		const { name, arguments: args } = request.params;

		if (name === 'hello_kolibri') {
			const userName = (args as { name?: string })?.name ?? 'World';
			const metadata = getSampleIndexMetadata();
			const totalEntries = metadata.counts.total;
			const totalSamples = metadata.counts.totalSamples;
			const totalDocs = metadata.counts.totalDocs;
			return {
				content: [
					{
						type: 'text',
						text: `Hello ${userName}! This is KoliBri MCP Server v${PACKAGE_VERSION}.\n${PACKAGE_DESCRIPTION ?? ''}\n\nSample index generated: ${metadata.generatedAt ?? 'unknown'} (mode: ${metadata.buildMode}).\nEntries available: ${totalEntries} (${totalSamples} samples, ${totalDocs} docs).`,
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

			const resultText = results.map((result) => {
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

	return server;
}

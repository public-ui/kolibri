import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { z } from 'zod';
import { getAllEntries, getEntryById, getSampleIndexMetadata } from '../dist/data.mjs';
import { searchEntries } from '../dist/search.mjs';

// Package info - read from environment or use defaults
const PACKAGE_VERSION = process.env.npm_package_version || '3.0.7';
const PACKAGE_NAME = '@public-ui/mcp';
const PACKAGE_DESCRIPTION = 'Model Context Protocol server providing AI agents access to 136+ KoliBri component examples and source code.';

/**
 * Create a configured KoliBri MCP server instance.
 */
function createKolibriMcpServer() {
	const server = new McpServer({
		name: PACKAGE_NAME,
		version: PACKAGE_VERSION,
	});

	// Add search tool for KoliBri samples and docs
	server.registerTool(
		'search',
		{
			title: 'Search KoliBri Samples and Docs',
			description:
				'Search for KoliBri component samples and documentation using fuzzy search. Parameters: query (required string), kind (optional: "sample" or "doc"), limit (optional number, default 10)',
			inputSchema: {
				query: z.string(),
				kind: z.string().optional(),
				limit: z.number().optional(),
			},
			outputSchema: {
				query: z.string(),
				totalResults: z.number(),
			},
		},
		async ({ query, kind, limit }) => {
			const queryStr = String(query ?? '');
			if (!queryStr || queryStr.trim().length === 0) {
				throw new Error('Query parameter is required and cannot be empty');
			}

			const allEntries = getAllEntries();
			const searchOptions = {
				limit: typeof limit === 'number' ? limit : 10,
			};

			if (kind === 'sample' || kind === 'doc') {
				searchOptions.kind = kind;
			}

			const results = searchEntries(allEntries, queryStr, searchOptions);

			const output = {
				query: queryStr,
				totalResults: results.length,
				results: results.map((result) => ({
					id: result.item.id,
					kind: result.item.kind,
					name: result.item.name,
					group: result.item.group ?? 'N/A',
					description: result.item.description ?? 'N/A',
					tags: result.item.tags ?? [],
					score: result.score,
					code: result.item.code ?? 'No code available',
					path: result.item.path ?? 'N/A',
				})),
			};

			const resultText = results
				.map((result, index) => {
					const { item, score } = result;
					const codePreview = item.code ? `\n  Code preview: ${item.code.substring(0, 150).replace(/\n/g, ' ')}...` : '';
					return `${index + 1}. [${item.kind}] ${item.id}: ${item.name}\n   Description: ${item.description ?? 'N/A'}\n   Match score: ${(score * 100).toFixed(1)}%\n   Tags: ${item.tags?.join(', ') ?? 'none'}${codePreview}`;
				})
				.join('\n\n');

			return {
				content: [
					{
						type: 'text',
						text: `Found ${results.length} result(s) for "${queryStr}":\n\n${resultText}\n\n💡 Tip: Use 'get_entry' with any ID above to see the full code.`,
					},
				],
				structuredContent: output,
			};
		},
	);

	// Add get_entry tool to retrieve specific samples/docs
	server.registerTool(
		'get_entry',
		{
			title: 'Get Sample or Doc Entry',
			description: 'Get a specific sample or documentation entry by its ID. Parameter: id (required string, e.g. "button/basic" or "docs/getting-started")',
			inputSchema: {
				id: z.string(),
			},
			outputSchema: {
				id: z.string(),
				kind: z.string(),
				name: z.string(),
			},
		},
		async ({ id }) => {
			const idStr = String(id ?? '');
			if (!idStr) {
				throw new Error('ID parameter is required');
			}

			const entry = getEntryById(idStr);

			if (!entry) {
				throw new Error(`Entry with ID "${idStr}" not found`);
			}

			const output = {
				id: entry.id,
				kind: entry.kind,
				name: entry.name,
				group: entry.group ?? 'N/A',
				description: entry.description ?? 'N/A',
				tags: entry.tags ?? [],
				code: entry.code ?? 'No code available',
				path: entry.path ?? 'N/A',
			};

			return {
				content: [
					{
						type: 'text',
						text: `# ${entry.name}\n\nID: ${entry.id}\nKind: ${entry.kind}\nGroup: ${entry.group ?? 'N/A'}\nDescription: ${entry.description ?? 'N/A'}\nTags: ${entry.tags?.join(', ') ?? 'none'}\n\n## Code\n\n\`\`\`\n${entry.code ?? 'No code available'}\n\`\`\``,
					},
				],
				structuredContent: output,
			};
		},
	);

	// Add server info resource
	server.registerResource(
		'info',
		new ResourceTemplate('kolibri://info', { list: undefined }),
		{
			title: 'KoliBri MCP Server Info',
			description: 'Get information about the KoliBri MCP Server and available samples',
		},
		async (uri) => {
			const metadata = getSampleIndexMetadata();
			const infoText = `# KoliBri MCP Server v${PACKAGE_VERSION}

${PACKAGE_DESCRIPTION}

## Sample Index
- Generated: ${metadata.generatedAt ?? 'unknown'}
- Build mode: ${metadata.buildMode}
- Total entries: ${metadata.counts.total}
- Samples: ${metadata.counts.totalSamples}
- Documentation: ${metadata.counts.totalDocs}

## Repository
- Branch: ${metadata.repo.branch ?? 'N/A'}
- Commit: ${metadata.repo.commit ?? 'N/A'}
- URL: ${metadata.repo.repoUrl ?? 'N/A'}
`;

			return {
				contents: [
					{
						uri: uri.href,
						mimeType: 'text/markdown',
						text: infoText,
					},
				],
			};
		},
	);

	return server;
}

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
		// Create server instance
		const server = createKolibriMcpServer();

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

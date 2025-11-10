import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { z } from 'zod';
import { getAllEntries, getEntryById, getSampleIndexMetadata } from '../dist/data.mjs';
import { searchEntries } from '../dist/search.mjs';

const KIND_OPTIONS = ['doc', 'sample', 'scenario', 'spec'];

const normalizeTags = (tags) => (Array.isArray(tags) ? tags : []);
const formatTagsForText = (tags) => {
	const normalized = normalizeTags(tags);
	return normalized.length > 0 ? normalized.join(', ') : 'none';
};

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
				'Search for KoliBri component samples, scenarios, specifications, and documentation using fuzzy search. Parameters: query (optional string), kind (optional select: "doc", "sample", "scenario", or "spec"), limit (optional number, default 10).',
			inputSchema: {
				query: z.string().optional().default(''),
				kind: z.enum(KIND_OPTIONS).optional(),
				limit: z.number().optional(),
			},
			outputSchema: {
				query: z.string(),
				totalResults: z.number(),
			},
		},
		async ({ query, kind, limit }) => {
			const queryStr = typeof query === 'string' ? query : '';

			const allEntries = getAllEntries();
			const searchOptions = {
				limit: typeof limit === 'number' ? limit : 10,
			};

			if (typeof kind === 'string' && KIND_OPTIONS.includes(kind)) {
				searchOptions.kind = kind;
			}

			const results = searchEntries(allEntries, queryStr, searchOptions);

			const structuredContent = {
				query: queryStr,
				totalResults: results.length,
				results: results.map(({ item, score }) => ({
					id: item.id,
					kind: item.kind,
					name: item.name,
					group: item.group ?? 'N/A',
					description: item.description ?? 'N/A',
					tags: normalizeTags(item.tags),
					score: score ?? 1,
					path: item.path ?? 'N/A',
				})),
			};

			const resultText = results.length
				? results
						.map(({ item, score }, index) => {
							const matchScore = ((score ?? 1) * 100).toFixed(1);
							const pathLine = item.path ? `\n   Path: ${item.path}` : '';
							return `${index + 1}. [${item.kind}] ${item.id}: ${item.name}\n   Description: ${item.description ?? 'N/A'}\n   Match score: ${matchScore}%\n   Tags: ${formatTagsForText(item.tags)}${pathLine}`;
						})
						.join('\n\n')
				: 'No matches found.';
			const tipText = results.length ? "\n\n💡 Tip: Use 'fetch' with any ID above to see full entry details." : '';

			return {
				content: [
					{
						type: 'text',
						text: `Found ${results.length} result(s) for "${queryStr}":\n\n${resultText}${tipText}`,
					},
				],
				structuredContent,
			};
		},
	);

	// Add fetch tool to retrieve specific samples/docs/scenarios/specs
	server.registerTool(
		'fetch',
		{
			title: 'Get Sample, Scenario, Doc, or Spec Entry',
			description:
				'Get a specific sample, scenario, documentation file, or specification entry by its ID. Parameter: id (required string, e.g. "button/basic", "scenario/forms/advanced", "docs/getting-started", or "spec/button/README")',
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
- Documentation: ${metadata.counts.totalDocs}
- Specifications: ${metadata.counts.totalSpecs ?? 0}
- Samples: ${metadata.counts.totalSamples}
- Scenarios: ${metadata.counts.totalScenarios ?? 0}

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

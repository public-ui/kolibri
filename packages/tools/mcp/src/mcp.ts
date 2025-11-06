import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import express from 'express';
import { createRequire } from 'node:module';
import { z } from 'zod';
import { getAllEntries, getEntryById, getSampleIndexMetadata } from './data.js';
import { searchEntries, type SearchOptions } from './search.js';

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

// Logging configuration
const ENABLE_LOGGING = process.env.MCP_LOGGING === 'true' || process.env.MCP_LOGGING === '1';

/**
 * Log a message if logging is enabled
 */
function log(type: 'info' | 'tool' | 'resource' | 'error', message: string, data?: any): void {
	if (!ENABLE_LOGGING) return;

	const timestamp = new Date().toISOString();
	const prefix = `[${timestamp}] [${type.toUpperCase()}]`;

	if (data) {
		console.error(`${prefix} ${message}`, JSON.stringify(data, null, 2));
	} else {
		console.error(`${prefix} ${message}`);
	}
}

/**
 * Create a configured KoliBri MCP server instance.
 * Can be used with both stdio and HTTP transports.
 */
export function createKolibriMcpServer(): McpServer {
	const server = new McpServer({
		name: PACKAGE_NAME,
		version: PACKAGE_VERSION,
	});

	return configureServer(server);
}

/**
 * Configure the MCP server with tools and resources.
 */
function configureServer(server: McpServer): McpServer {
	// Add search tool for KoliBri samples and docs
	server.registerTool(
		'search',
		{
			title: 'Search KoliBri Samples and Docs',
			description:
				'Search for KoliBri component samples and documentation using fuzzy search. Parameters: query (required string), kind (optional: "sample" or "doc"), limit (optional number, default 10)',
			inputSchema: {
				query: z.string(),
				kind: z.string().optional() as any,
				limit: z.number().optional() as any,
			},
			outputSchema: {
				query: z.string(),
				totalResults: z.number(),
			},
		},
		async ({ query, kind, limit }) => {
			log('tool', 'search called', { query, kind, limit });

			const queryStr = String(query ?? '');
			if (!queryStr || queryStr.trim().length === 0) {
				log('error', 'search failed: empty query');
				throw new Error('Query parameter is required and cannot be empty');
			}

			const allEntries = getAllEntries();
			const searchOptions: SearchOptions = {
				limit: typeof limit === 'number' ? limit : 10,
			};

			if (kind === 'sample' || kind === 'doc') {
				searchOptions.kind = kind;
			}

			const results = searchEntries(allEntries, queryStr, searchOptions);

			log('tool', 'search completed', {
				query: queryStr,
				resultCount: results.length,
				options: searchOptions,
			});

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
                                                text: `Found ${results.length} result(s) for "${queryStr}":\n\n${resultText}\n\n💡 Tip: Use 'fetch' with any ID above to see the full code.`,
					},
				],
				structuredContent: output,
			};
		},
	);

        // Add fetch tool to retrieve specific samples/docs
        server.registerTool(
                'fetch',
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
                        log('tool', 'fetch called', { id });

			const idStr = String(id ?? '');
                        if (!idStr) {
                                log('error', 'fetch failed: empty id');
				throw new Error('ID parameter is required');
			}

			const entry = getEntryById(idStr);

                        if (!entry) {
                                log('error', 'fetch failed: entry not found', { id: idStr });
				throw new Error(`Entry with ID "${idStr}" not found`);
			}

                        log('tool', 'fetch completed', { id: idStr, kind: entry.kind });

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
			log('resource', 'info accessed', { uri: uri.href });

			const metadata = getSampleIndexMetadata();
			const infoText = `# KoliBri MCP Server v${PACKAGE_VERSION}

${PACKAGE_DESCRIPTION ?? ''}

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

	// Add best practices resource
	server.registerResource(
		'best-practices',
		new ResourceTemplate('kolibri://best-practices', { list: undefined }),
		{
			title: 'KoliBri Best Practices',
			description: 'Essential guidelines for working with KoliBri Web Components',
		},
		async (uri) => {
			log('resource', 'best-practices accessed', { uri: uri.href });

			const practicesText = `# KoliBri Web Components - Best Practices

## Essential Guidelines

1. **Component Registration**
   Always register KoliBri Web Components in the browser runtime before rendering them.

2. **Integration Setup**
   Choose the integration guide that matches your project setup to load and bundle the components correctly.

3. **Icon Font Assets**
   Bundle the KoliBri icon font assets (for example codicon.css and codicon.ttf) so kol-icon glyphs can render.

4. **Form Validation**
   Wrap input elements with <kol-form> and feed its _errorList to surface validation issues via the generated error summary.

## Additional Resources

Use the 'search' tool to find specific component examples and implementation details.
Use the 'fetch' tool to retrieve full code samples for specific components.
`;

			return {
				contents: [
					{
						uri: uri.href,
						mimeType: 'text/markdown',
						text: practicesText,
					},
				],
			};
		},
	);

	return server;
}

// Start HTTP server if this file is run directly
if (
	import.meta.url === `file://${process.argv[1]}` ||
	process.argv[1]?.endsWith('/mcp.ts') ||
	process.argv[1]?.endsWith('/mcp.cjs') ||
	process.argv[1]?.endsWith('/mcp.mjs')
) {
	const server = createKolibriMcpServer();

	// Set up Express and HTTP transport
	const app = express();
	app.use(express.json());

	app.post('/mcp', async (req, res) => {
		// Create a new transport for each request to prevent request ID collisions
		const transport = new StreamableHTTPServerTransport({
			sessionIdGenerator: undefined,
			enableJsonResponse: true,
		});

		res.on('close', () => {
			transport.close();
		});

		await server.connect(transport);
		await transport.handleRequest(req, res, req.body);
	});

	const port = parseInt(process.env.PORT || '3000');
	app
		.listen(port, () => {
			console.log(`KoliBri MCP Server v${PACKAGE_VERSION} running on http://localhost:${port}/mcp`);
			const metadata = getSampleIndexMetadata();
			console.log(`Loaded ${metadata.counts.total} entries (${metadata.counts.totalSamples} samples, ${metadata.counts.totalDocs} docs)`);

			if (ENABLE_LOGGING) {
				console.log('🔍 Logging is ENABLED (MCP_LOGGING=true)');
			} else {
				console.log('💡 Logging is disabled. Set MCP_LOGGING=true to enable request logging');
			}
		})
		.on('error', (error) => {
			console.error('Server error:', error);
			process.exit(1);
		});
}

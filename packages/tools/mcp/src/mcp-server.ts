import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { createRequire } from 'node:module';
import { z } from 'zod';
import {
	ContentCounts,
	SampleEntry,
	SampleIndexLike,
	createCanonicalUrlFromEntry,
	createDocDetailPayload,
	createDocsListPayload,
	createFetchToolPayload,
	createHealthPayload,
	createOverviewPayload,
	createSampleDetailPayload,
	createSamplesListPayload,
	createSearchPayload,
	createSearchToolResult,
	createToolTextContent,
	resolveCounts,
	resolveEntryTitle,
	toResourceContents,
} from './mcp-content.js';

const require = createRequire(import.meta.url);
const {
	version: PACKAGE_VERSION = '0.0.0',
	name: PACKAGE_NAME = '@public-ui/mcp',
	description: PACKAGE_DESCRIPTION,
	homepage: PACKAGE_HOMEPAGE,
} = require('../package.json') as {
	version?: string;
	name?: string;
	description?: string;
	homepage?: string;
};

export interface KolibriServerInfo {
	name?: string;
	version?: string;
	description?: string;
	homepage?: string;
}

export interface KolibriMcpServerOptions {
	index: SampleIndexLike;
	counts?: ContentCounts;
	serverInfo?: KolibriServerInfo;
}

function buildDefaultServerInfo(overrides: KolibriServerInfo = {}) {
	return {
		name: overrides.name ?? PACKAGE_NAME ?? 'KoliBri MCP Server',
		version: overrides.version ?? PACKAGE_VERSION,
		description: overrides.description ?? PACKAGE_DESCRIPTION ?? 'Model Context Protocol server providing access to KoliBri samples and documentation.',
		homepage: overrides.homepage ?? PACKAGE_HOMEPAGE ?? 'https://public-ui.github.io',
	};
}

function buildResourceDescriptors(entries: SampleEntry[], kind: 'doc' | 'sample') {
	return entries.map((entry) => ({
		name: entry.id,
		uri: `${kind === 'sample' ? 'kolibri-sample' : 'kolibri-doc'}://${entry.id}`,
		title: resolveEntryTitle(entry),
		description: kind === 'sample' ? `KoliBri sample for ${entry.group ?? 'component usage'} (${entry.id}).` : `KoliBri documentation entry (${entry.id}).`,
		mimeType: 'application/json',
		_meta: {
			kind: entry.kind ?? kind,
			group: entry.group,
			path: entry.path,
			url: createCanonicalUrlFromEntry(entry),
		},
	}));
}

export function createKolibriMcpServer(options: KolibriMcpServerOptions): McpServer {
	const { index } = options;
	const counts = options.counts ?? resolveCounts(index);
	const serverInfo = buildDefaultServerInfo(options.serverInfo);

	const server = new McpServer({
		name: serverInfo.name,
		version: serverInfo.version,
		description: serverInfo.description,
		homepage: serverInfo.homepage,
	});

	registerResources(server, index, counts);
	registerTools(server, index, counts);

	return server;
}

function registerResources(server: McpServer, index: SampleIndexLike, counts: ContentCounts) {
	server.registerResource(
		'kolibri-overview',
		'kolibri://overview',
		{
			title: 'KoliBri MCP overview',
			description: 'High-level metadata about the KoliBri MCP server.',
			mimeType: 'application/json',
		},
		async (uri) => ({
			contents: [toResourceContents(uri, createOverviewPayload(index, counts))],
		}),
	);

	server.registerResource(
		'kolibri-health',
		'kolibri://health',
		{
			title: 'KoliBri MCP health status',
			description: 'Current health status and cached entry counters.',
			mimeType: 'application/json',
		},
		async (uri) => ({
			contents: [toResourceContents(uri, createHealthPayload(index, counts))],
		}),
	);

	server.registerResource(
		'kolibri-samples',
		'kolibri://catalog/samples',
		{
			title: 'KoliBri sample catalogue',
			description: 'Complete list of indexed component samples.',
			mimeType: 'application/json',
		},
		async (uri) => ({
			contents: [
				toResourceContents(
					uri,
					createSamplesListPayload(index, counts, {
						includeMatchCount: true,
					}),
				),
			],
		}),
	);

	server.registerResource(
		'kolibri-docs',
		'kolibri://catalog/docs',
		{
			title: 'KoliBri documentation catalogue',
			description: 'Complete list of indexed documentation entries.',
			mimeType: 'application/json',
		},
		async (uri) => ({
			contents: [
				toResourceContents(
					uri,
					createDocsListPayload(index, counts, {
						includeMatchCount: true,
					}),
				),
			],
		}),
	);

	const sampleTemplate = new ResourceTemplate('kolibri-sample://{id}', {
		list: async () => ({
			resources: buildResourceDescriptors(index.list('', { kinds: ['sample'] }), 'sample'),
		}),
		complete: {
			id: async (value: string) => {
				const normalized = value.trim().toLowerCase();
				return index
					.list('', { kinds: ['sample'] })
					.map((entry) => entry.id)
					.filter((id) => id.toLowerCase().startsWith(normalized))
					.slice(0, 100);
			},
		},
	});

	server.registerResource(
		'kolibri-sample-detail',
		sampleTemplate,
		{
			title: 'KoliBri sample entry',
			description: 'Full source code and metadata for a component sample.',
			mimeType: 'application/json',
		},
		async (uri, variables) => {
			const id = (variables.id ?? '').trim();
			if (!id) {
				throw new McpError(ErrorCode.InvalidParams, 'The "id" parameter must be provided.');
			}

			const entry = index.get(id);
			if (!entry || (entry.kind ?? 'sample') !== 'sample') {
				throw new McpError(ErrorCode.InvalidParams, `Sample not found: ${id}`);
			}

			return {
				contents: [toResourceContents(uri, createSampleDetailPayload(entry, index))],
			};
		},
	);

	const docTemplate = new ResourceTemplate('kolibri-doc://{id}', {
		list: async () => ({
			resources: buildResourceDescriptors(index.list('', { kinds: ['doc'] }), 'doc'),
		}),
		complete: {
			id: async (value: string) => {
				const normalized = value.trim().toLowerCase();
				return index
					.list('', { kinds: ['doc'] })
					.map((entry) => entry.id)
					.filter((id) => id.toLowerCase().startsWith(normalized))
					.slice(0, 100);
			},
		},
	});

	server.registerResource(
		'kolibri-doc-detail',
		docTemplate,
		{
			title: 'KoliBri documentation entry',
			description: 'Markdown documentation for KoliBri concepts and migration guides.',
			mimeType: 'application/json',
		},
		async (uri, variables) => {
			const id = (variables.id ?? '').trim();
			if (!id) {
				throw new McpError(ErrorCode.InvalidParams, 'The "id" parameter must be provided.');
			}

			const entry = index.get(id);
			if (!entry || (entry.kind ?? 'doc') !== 'doc') {
				throw new McpError(ErrorCode.InvalidParams, `Documentation entry not found: ${id}`);
			}

			return {
				contents: [toResourceContents(uri, createDocDetailPayload(entry, index))],
			};
		},
	);
}

function registerTools(server: McpServer, index: SampleIndexLike, counts: ContentCounts) {
        const searchInput = z.object({
                query: z.string().min(1, 'Provide a non-empty search query.'),
                kinds: z.array(z.enum(['doc', 'sample'])).optional(),
                limit: z.number().int().min(1).max(100).optional(),
        });

        const executeSearch = async (
                { query, kinds, limit }: z.infer<typeof searchInput>,
                fallbackKinds?: ['doc'] | ['sample'],
        ) => {
                const payload = createSearchPayload(index, counts, {
                        query,
                        kinds: kinds ?? fallbackKinds,
                        limit,
                });
                const structured = {
                        ...payload,
                        results: createSearchToolResult(payload, { index }).results,
                };

                return {
                        content: createToolTextContent(structured),
                        structuredContent: structured,
                };
        };

        server.registerTool(
                'search',
		{
			title: 'Search KoliBri entries',
			description: 'Searches KoliBri samples and documentation entries by text query.',
			inputSchema: searchInput,
			annotations: {
				readOnlyHint: true,
				idempotentHint: true,
			},
		},
                async (input) => executeSearch(input),
        );

        server.registerTool(
                'search-samples',
                {
                        title: 'Search KoliBri samples',
                        description: 'Searches only KoliBri component samples by text query.',
                        inputSchema: searchInput,
                        annotations: {
                                readOnlyHint: true,
                                idempotentHint: true,
                        },
                },
                async (input) => executeSearch(input, ['sample']),
        );

        server.registerTool(
                'search-docs',
                {
                        title: 'Search KoliBri documentation',
                        description: 'Searches only KoliBri documentation entries by text query.',
                        inputSchema: searchInput,
                        annotations: {
                                readOnlyHint: true,
                                idempotentHint: true,
                        },
                },
                async (input) => executeSearch(input, ['doc']),
        );

	const listInput = z.object({
		query: z.string().optional(),
		limit: z.number().int().min(1).max(100).optional(),
	});

	server.registerTool(
		'list-samples',
		{
			title: 'List KoliBri samples',
			description: 'Lists component samples with optional free-text filtering.',
			inputSchema: listInput,
			annotations: {
				readOnlyHint: true,
				idempotentHint: true,
			},
		},
		async ({ query, limit }) => {
			const payload = createSamplesListPayload(index, counts, {
				query,
				limit,
				includeMatchCount: true,
			});

			return {
				content: createToolTextContent(payload),
				structuredContent: payload,
			};
		},
	);

	server.registerTool(
		'get-sample',
		{
			title: 'Fetch sample source code',
			description: 'Retrieves the full source code for a single KoliBri sample entry.',
			inputSchema: z.object({
				id: z.string().min(1, 'Provide a sample identifier such as sample/button/basic.'),
			}),
			annotations: {
				readOnlyHint: true,
				idempotentHint: true,
			},
		},
		async ({ id }) => {
			const entry = index.get(id);
			if (!entry || (entry.kind ?? 'sample') !== 'sample') {
				throw new McpError(ErrorCode.InvalidParams, `Sample not found: ${id}`);
			}

			const payload = createSampleDetailPayload(entry, index);
			return {
				content: createToolTextContent(payload),
				structuredContent: payload,
			};
		},
	);

	server.registerTool(
		'list-docs',
		{
			title: 'List documentation entries',
			description: 'Lists Markdown documentation entries with optional filtering.',
			inputSchema: listInput,
			annotations: {
				readOnlyHint: true,
				idempotentHint: true,
			},
		},
		async ({ query, limit }) => {
			const payload = createDocsListPayload(index, counts, {
				query,
				limit,
				includeMatchCount: true,
			});

			return {
				content: createToolTextContent(payload),
				structuredContent: payload,
			};
		},
	);

	server.registerTool(
		'get-doc',
		{
			title: 'Fetch documentation entry',
			description: 'Returns the Markdown content for a documentation entry.',
			inputSchema: z.object({
				id: z.string().min(1, 'Provide a documentation identifier such as doc/README.'),
			}),
			annotations: {
				readOnlyHint: true,
				idempotentHint: true,
			},
		},
		async ({ id }) => {
			const entry = index.get(id);
			if (!entry || (entry.kind ?? 'doc') !== 'doc') {
				throw new McpError(ErrorCode.InvalidParams, `Documentation entry not found: ${id}`);
			}

			const payload = createDocDetailPayload(entry, index);
			return {
				content: createToolTextContent(payload),
				structuredContent: payload,
			};
		},
	);

	server.registerTool(
		'fetch',
		{
			title: 'Fetch entry by identifier',
			description: 'Retrieves the full text content for a sample or documentation entry.',
			inputSchema: z.object({
				id: z.string().min(1, 'Provide a sample or documentation identifier.'),
			}),
			annotations: {
				readOnlyHint: true,
				idempotentHint: true,
			},
		},
		async ({ id }) => {
			const entry = index.get(id);
			if (!entry) {
				throw new McpError(ErrorCode.InvalidParams, `Entry not found: ${id}`);
			}

			const payload = createFetchToolPayload(entry, index);
			return {
				content: createToolTextContent(payload),
				structuredContent: payload,
			};
		},
	);

	server.registerTool(
		'get-health',
		{
			title: 'Get MCP health status',
			description: 'Returns the current health status and cached counters of the MCP server.',
			annotations: {
				readOnlyHint: true,
				idempotentHint: true,
			},
		},
		async () => {
			const payload = createHealthPayload(index, counts);
			return {
				content: createToolTextContent(payload),
				structuredContent: payload,
			};
		},
	);

	server.registerTool(
		'health',
		{
			title: 'Get MCP health status',
			description: 'Alias of get-health for backwards compatibility.',
			annotations: {
				readOnlyHint: true,
				idempotentHint: true,
			},
		},
		async () => {
			const payload = createHealthPayload(index, counts);
			return {
				content: createToolTextContent(payload),
				structuredContent: payload,
			};
		},
	);
}

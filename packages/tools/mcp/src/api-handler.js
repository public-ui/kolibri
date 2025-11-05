import { createRequire } from 'node:module';
import { URL } from 'node:url';

const require = createRequire(import.meta.url);
const { version: PACKAGE_VERSION, name: PACKAGE_NAME, description: PACKAGE_DESCRIPTION, homepage: PACKAGE_HOMEPAGE } = require('../package.json');

const JSON_RPC_VERSION = '2.0';
const JSON_RPC_CONTENT_TYPE = 'application/json; charset=utf-8';
const JSON_RPC_ERROR_CODES = Object.freeze({
	PARSE_ERROR: -32700,
	INVALID_REQUEST: -32600,
	METHOD_NOT_FOUND: -32601,
	INVALID_PARAMS: -32602,
	INTERNAL_ERROR: -32603,
});

const TOOL_ERROR_CODES = Object.freeze({
	NOT_FOUND: -32004,
});

const TRANSPORT_PATHS = Object.freeze({
	http: '/http',
	sse: '/sse',
});

const REPO_BLOB_BASE_URL = 'https://github.com/public-ui/kolibri/blob/main/';
const REPO_DEFAULT_URL = 'https://github.com/public-ui/kolibri';

const RESOURCE_DEFINITIONS = Object.freeze([
	{
		id: 'health',
		name: 'Health Status',
		description: 'Reports the service health together with counters for all indexed entries.',
		endpoint: '/health',
		kind: 'status',
		streaming: true,
		methods: ['GET'],
		params: [],
	},
	{
		id: 'samples',
		name: 'Component Samples',
		description: 'Lists every indexed sample and supports optional filtering by free-text query.',
		endpoint: '/samples',
		kind: 'collection',
		streaming: true,
		methods: ['GET'],
		params: ['q'],
	},
	{
		id: 'sample',
		name: 'Component Sample Detail',
		description: 'Returns the source code, metadata, and AI hints for a specific component example.',
		endpoint: '/sample',
		kind: 'item',
		streaming: true,
		methods: ['GET'],
		params: ['id'],
	},
	{
		id: 'docs',
		name: 'Documentation Entries',
		description: 'Lists Markdown documentation entries such as guides, migration notes, and READMEs.',
		endpoint: '/docs',
		kind: 'collection',
		streaming: true,
		methods: ['GET'],
		params: ['q'],
	},
	{
		id: 'doc',
		name: 'Documentation Detail',
		description: 'Returns the Markdown content and metadata for a single documentation entry.',
		endpoint: '/doc',
		kind: 'item',
		streaming: true,
		methods: ['GET'],
		params: ['id'],
	},
]);

const STREAMING_HEADERS = {
	'Cache-Control': 'no-cache, no-transform',
	Connection: 'keep-alive',
	'Content-Type': 'text/event-stream; charset=utf-8',
	'X-Accel-Buffering': 'no',
};

const TRANSPORT_MODES = Object.freeze({
	HTTP: 'http',
	SSE: 'sse',
});

class ToolExecutionError extends Error {
	constructor(code, message, data) {
		super(message);
		this.name = 'ToolExecutionError';
		this.code = code;
		this.data = data;
	}
}

function buildCorsHeaders() {
	return {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type',
	};
}

function logRequest(method, url, pathname, statusCode, responseTime) {
	// Only log if MCP_DEBUG is enabled
	if (!process.env.MCP_DEBUG) {
		return;
	}

	// Skip logging for root path requests to reduce noise
	if (pathname === '/') {
		return;
	}

	const timestamp = new Date().toISOString();
	const methodFormatted = method.padEnd(7);
	const statusFormatted = statusCode.toString().padStart(3);
	const timeFormatted = `${responseTime}ms`.padStart(6);

	// Color coding for status codes
	let statusColor = '';
	if (statusCode >= 200 && statusCode < 300) {
		statusColor = '\x1b[32m'; // Green for 2xx
	} else if (statusCode >= 300 && statusCode < 400) {
		statusColor = '\x1b[33m'; // Yellow for 3xx
	} else if (statusCode >= 400) {
		statusColor = '\x1b[31m'; // Red for 4xx and 5xx
	}

	console.log(
		`\x1b[90m[${timestamp}]\x1b[0m ${methodFormatted} ${statusColor}${statusFormatted}\x1b[0m ${timeFormatted} ${pathname}${url !== pathname ? ` (${url})` : ''}`,
	);
}

function createSseStream({ meta = {}, items = [], itemEventName = 'item' } = {}) {
	const enrichedMeta = withAiHints(meta);
	return (async function* streamGenerator() {
		yield ': connected\n\n';
		yield `event: meta\ndata: ${JSON.stringify(enrichedMeta)}\n\n`;

		let index = 0;
		for (const item of items) {
			const payload = { index, ...item };
			yield `event: ${itemEventName}\ndata: ${JSON.stringify(payload)}\n\n`;
			index += 1;
		}

		yield `event: end\ndata: ${JSON.stringify({ total: items.length })}\n\n`;
	})();
}

export const AI_HINTS_KEY = 'ai-hints';
export const AI_HINTS_MESSAGES = Object.freeze([
	'Always register KoliBri Web Components in the browser runtime before rendering them.',
	'Choose the integration guide that matches your project setup to load and bundle the components correctly.',
	'Bundle the KoliBri icon font assets (for example codicon.css and codicon.ttf) so kol-icon glyphs can render.',
	'Wrap input elements with <kol-form> and feed its _errorList to surface validation issues via the generated error summary.',
]);

function normalizeHints(value) {
	if (Array.isArray(value)) {
		return value.length > 0 ? value : AI_HINTS_MESSAGES;
	}

	if (typeof value === 'string') {
		const trimmed = value.trim();
		return trimmed ? [trimmed] : AI_HINTS_MESSAGES;
	}

	return AI_HINTS_MESSAGES;
}

function withAiHints(body = {}) {
	const normalizedHints = normalizeHints(body[AI_HINTS_KEY]);
	return { ...body, [AI_HINTS_KEY]: normalizedHints };
}

function normalizePathForRepoUrl(pathValue) {
	if (typeof pathValue !== 'string' || !pathValue.trim()) {
		return undefined;
	}

	const normalized = pathValue
		.replace(/^[.\/]+/, '')
		.replace(/\\/g, '/')
		.trim();

	return normalized ? normalized : undefined;
}

function createCanonicalUrlFromEntry(entry = {}) {
	if (typeof entry.url === 'string' && entry.url.trim()) {
		return entry.url.trim();
	}

	const normalizedPath = normalizePathForRepoUrl(entry.path);
	if (!normalizedPath) {
		return REPO_DEFAULT_URL;
	}

	return `${REPO_BLOB_BASE_URL}${normalizedPath}`;
}

function resolveEntryTitle(entry = {}) {
	if (typeof entry.title === 'string' && entry.title.trim()) {
		return entry.title.trim();
	}

	if (typeof entry.name === 'string' && entry.name.trim()) {
		return entry.name.trim();
	}

	if (typeof entry.id === 'string' && entry.id.trim()) {
		return entry.id.trim();
	}

	return 'Untitled entry';
}

function computeCountsFromEntries(entries = []) {
	return entries.reduce(
		(acc, entry) => {
			const kind = entry?.kind ?? 'sample';
			acc.total += 1;
			if (kind === 'sample') {
				acc.totalSamples += 1;
				return acc;
			}

			if (kind === 'doc') {
				acc.totalDocs += 1;
			}

			return acc;
		},
		{ total: 0, totalSamples: 0, totalDocs: 0 },
	);
}

function resolveCounts(index) {
	if (!index) {
		return computeCountsFromEntries();
	}

	const fallbackCounts = computeCountsFromEntries(index.entries ?? []);
	const source = index.counts ?? {};

	return {
		total: typeof source.total === 'number' ? source.total : fallbackCounts.total,
		totalSamples: typeof source.totalSamples === 'number' ? source.totalSamples : fallbackCounts.totalSamples,
		totalDocs: typeof source.totalDocs === 'number' ? source.totalDocs : fallbackCounts.totalDocs,
	};
}

function ensureDate(value) {
	if (value instanceof Date && !Number.isNaN(value.valueOf())) {
		return value;
	}

	if (typeof value === 'string' || typeof value === 'number') {
		const date = new Date(value);
		if (!Number.isNaN(date.valueOf())) {
			return date;
		}
	}

	return new Date();
}

function isPlainObject(value) {
	return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function parseLimit(value) {
	if (typeof value === 'number' && Number.isFinite(value)) {
		return Math.max(1, Math.min(100, Math.trunc(value)));
	}

	if (typeof value === 'string' && value.trim()) {
		const parsed = Number.parseInt(value, 10);
		if (Number.isFinite(parsed)) {
			return Math.max(1, Math.min(100, Math.trunc(parsed)));
		}
	}

	return undefined;
}

function applyLimit(items, limit) {
	if (typeof limit !== 'number') {
		return items;
	}

	return items.slice(0, limit);
}

function sanitizeKinds(input) {
	if (!Array.isArray(input)) {
		return undefined;
	}

	const normalized = input.map((value) => `${value}`.trim().toLowerCase()).filter((value) => value === 'sample' || value === 'doc');

	const unique = Array.from(new Set(normalized));
	return unique.length > 0 ? unique : undefined;
}

function formatEntrySummary(entry) {
	return {
		group: entry.group,
		id: entry.id,
		name: entry.name,
		path: entry.path,
		kind: entry.kind ?? 'sample',
	};
}

function createSampleDetailPayload(entry, index) {
	return {
		id: entry.id,
		group: entry.group,
		name: entry.name,
		path: entry.path,
		code: entry.code,
		kind: entry.kind ?? 'sample',
		generatedAt: ensureDate(index.generatedAt).toISOString(),
	};
}

function createDocDetailPayload(entry, index) {
	return {
		id: entry.id,
		group: entry.group,
		name: entry.name,
		path: entry.path,
		code: entry.code,
		kind: entry.kind ?? 'doc',
		generatedAt: ensureDate(index.generatedAt).toISOString(),
	};
}

function createSamplesListPayload(index, counts, { query = '', limit, includeMatchCount = false } = {}) {
	const normalizedQuery = typeof query === 'string' ? query.trim() : '';
	const items = index.list(normalizedQuery, { kinds: ['sample'] }).map(formatEntrySummary);
	const limitValue = parseLimit(limit);
	const limitedItems = applyLimit(items, limitValue ?? items.length);
	const payload = {
		items: limitedItems,
		query: normalizedQuery,
		total: limitedItems.length,
		totalEntries: counts.total,
		totalSamples: counts.totalSamples,
		totalDocs: counts.totalDocs,
		generatedAt: ensureDate(index.generatedAt).toISOString(),
	};

	if (includeMatchCount) {
		payload.totalMatches = items.length;
		payload.returned = limitedItems.length;
		if (limitValue !== undefined) {
			payload.limit = limitValue;
		}
	}

	return payload;
}

function createDocsListPayload(index, counts, { query = '', limit, includeMatchCount = false } = {}) {
	const normalizedQuery = typeof query === 'string' ? query.trim() : '';
	const items = index.list(normalizedQuery, { kinds: ['doc'] }).map(formatEntrySummary);
	const limitValue = parseLimit(limit);
	const limitedItems = applyLimit(items, limitValue ?? items.length);
	const payload = {
		items: limitedItems,
		query: normalizedQuery,
		total: limitedItems.length,
		totalEntries: counts.totalDocs,
		totalDocs: counts.totalDocs,
		generatedAt: ensureDate(index.generatedAt).toISOString(),
	};

	if (includeMatchCount) {
		payload.totalMatches = items.length;
		payload.returned = limitedItems.length;
		if (limitValue !== undefined) {
			payload.limit = limitValue;
		}
	}

	return payload;
}

function createSearchPayload(index, counts, { query = '', kinds, limit } = {}) {
	const normalizedQuery = typeof query === 'string' ? query.trim() : '';
	if (!normalizedQuery) {
		throw new ToolExecutionError(JSON_RPC_ERROR_CODES.INVALID_PARAMS, 'The "query" parameter must be a non-empty string.');
	}

	const normalizedKinds = sanitizeKinds(kinds);
	const items = index.list(normalizedQuery, { kinds: normalizedKinds }).map(formatEntrySummary);
	const limitValue = parseLimit(limit);
	const limitedItems = applyLimit(items, limitValue ?? items.length);
	return {
		query: normalizedQuery,
		kinds: normalizedKinds ?? ['sample', 'doc'],
		totalMatches: items.length,
		returned: limitedItems.length,
		generatedAt: ensureDate(index.generatedAt).toISOString(),
		counts: {
			total: counts.total,
			totalSamples: counts.totalSamples,
			totalDocs: counts.totalDocs,
		},
		items: limitedItems,
		...(limitValue !== undefined ? { limit: limitValue } : {}),
	};
}

function createHealthPayload(index, counts) {
	const generatedAt = ensureDate(index.generatedAt).toISOString();
	const entries = Array.isArray(index.entries) ? index.entries : [];
	const isHealthy = counts.total > 0;
	return {
		status: isHealthy ? 'ok' : 'error',
		healthy: isHealthy,
		totalEntries: counts.total,
		totalSamples: counts.totalSamples,
		totalDocs: counts.totalDocs,
		message: isHealthy ? `System healthy with ${counts.total} entries available` : 'No entries found - system may not be properly initialized',
		generatedAt,
		debug: {
			indexGeneratedAt: generatedAt,
			entriesLength: entries.length,
			firstFewEntries: entries.slice(0, 3).map((entry) => entry.id),
		},
	};
}

function createSnippetFromText(text, maxLength = 200) {
	if (typeof text !== 'string') {
		return undefined;
	}

	const normalized = text.replace(/\s+/g, ' ').trim();
	if (!normalized) {
		return undefined;
	}

	if (normalized.length <= maxLength) {
		return normalized;
	}

	return `${normalized.slice(0, Math.max(0, maxLength - 1))}…`;
}

function createSearchToolResult(payload = {}, context = {}) {
	const items = Array.isArray(payload.items) ? payload.items : [];
	const results = items
		.map((item) => {
			const metadata = {};
			const kind = item.kind ?? 'sample';
			if (kind) {
				metadata.kind = kind;
			}
			if (item.group) {
				metadata.group = item.group;
			}
			if (item.path) {
				metadata.path = item.path;
			}

			const entry = typeof context?.index?.get === 'function' ? context.index.get(item.id) : undefined;
			const snippet = entry ? createSnippetFromText(entry.code) : undefined;
			if (snippet) {
				metadata.snippet = snippet;
			}

			const id = typeof item.id === 'string' ? item.id : `${item.id ?? ''}`.trim();
			if (!id) {
				return null;
			}

			const result = {
				id,
				title: resolveEntryTitle(item),
				url: createCanonicalUrlFromEntry(item),
			};

			if (Object.keys(metadata).length > 0) {
				result.metadata = metadata;
			}

			return result;
		})
		.filter(Boolean);

	return { results };
}

function createToolTextContent(payload) {
	return [
		{
			type: 'text',
			text: JSON.stringify(payload),
		},
	];
}

function compactMetadata(metadata = {}) {
	return Object.fromEntries(Object.entries(metadata).filter(([, value]) => value !== undefined && value !== null && value !== ''));
}

function resolveIdFromArguments(args) {
	if (typeof args === 'string') {
		return args.trim();
	}

	if (Array.isArray(args)) {
		const first = args.find((value) => typeof value === 'string' && value.trim());
		if (first) {
			return first.trim();
		}
	}

	if (isPlainObject(args)) {
		if (typeof args.id === 'string' && args.id.trim()) {
			return args.id.trim();
		}
		if (typeof args.name === 'string' && args.name.trim()) {
			return args.name.trim();
		}
	}

	return '';
}

function normalizeSearchArguments(args) {
	if (typeof args === 'string') {
		return { query: args };
	}

	if (Array.isArray(args) && args.length > 0) {
		const first = args.find((value) => typeof value === 'string' && value.trim());
		if (first) {
			return { query: first };
		}
	}

	if (isPlainObject(args)) {
		return args;
	}

	return {};
}

function createFetchToolPayload(entry, index) {
	const text = typeof entry?.code === 'string' ? entry.code : JSON.stringify(entry?.code ?? '', null, 2);
	const metadata = compactMetadata({
		kind: entry?.kind ?? 'sample',
		group: entry?.group,
		path: entry?.path,
		generatedAt: ensureDate(index?.generatedAt).toISOString(),
	});

	return {
		id: entry?.id,
		title: resolveEntryTitle(entry),
		text,
		url: createCanonicalUrlFromEntry(entry),
		...(Object.keys(metadata).length > 0 ? { metadata } : {}),
	};
}

function createOverviewPayload(index, counts) {
	const generatedAt = ensureDate(index?.generatedAt).toISOString();
	return withAiHints({
		message: 'KoliBri MCP backend is running.',
		endpoints: [
			'/initialize',
			'/initialize?stream=1',
			'/health',
			'/health?stream=1',
			'/samples',
			'/samples?q=<query>',
			'/samples?stream=1',
			'/sample?id=sample/<component>/<sample>',
			'/sample?id=sample/<component>/<sample>&stream=1',
			'/docs',
			'/docs?q=<query>',
			'/docs?stream=1',
			'/doc?id=doc/<identifier>',
			'/doc?id=doc/<identifier>&stream=1',
		],
		transports: { ...TRANSPORT_PATHS },
		totals: {
			total: counts.total,
			samples: counts.totalSamples,
			docs: counts.totalDocs,
		},
		totalEntries: counts.total,
		totalSamples: counts.totalSamples,
		totalDocs: counts.totalDocs,
		generatedAt,
		buildMode: index?.buildMode ?? 'runtime',
		streaming: { sse: true },
		jsonrpc: {
			version: JSON_RPC_VERSION,
			methods: ['initialize', 'tools/list', 'tools/call'],
		},
	});
}

function createInitializePayload(index, counts) {
	return withAiHints({
		protocol: '2024-11-05',
		server: {
			name: PACKAGE_NAME ?? 'KoliBri MCP Server',
			version: PACKAGE_VERSION,
			description: PACKAGE_DESCRIPTION ?? 'Model Context Protocol server providing access to KoliBri samples and documentation.',
			homepage: PACKAGE_HOMEPAGE ?? 'https://public-ui.github.io',
		},
		capabilities: {
			streaming: { sse: true },
			filters: ['q'],
			tools: { list: true, call: true },
			resources: { list: true, read: true },
		},
		transports: { ...TRANSPORT_PATHS },
		resources: RESOURCE_DEFINITIONS,
		totals: {
			total: counts.total,
			samples: counts.totalSamples,
			docs: counts.totalDocs,
		},
		generatedAt: ensureDate(index.generatedAt).toISOString(),
		jsonrpc: {
			version: JSON_RPC_VERSION,
			methods: ['initialize', 'tools/list', 'tools/call'],
		},
	});
}

const TOOL_ENTRIES = Object.freeze([
	{
		definition: {
			name: 'search',
			description: 'Searches KoliBri samples and documentation entries by text query.',
			input_schema: {
				oneOf: [
					{
						type: 'string',
						description: 'Free-text search term used to match ids, names, and titles.',
					},
					{
						type: 'object',
						properties: {
							query: {
								type: 'string',
								description: 'Free-text search term used to match ids, names, and titles.',
							},
							kinds: {
								type: 'array',
								description: 'Optional entry kinds to include. Defaults to both samples and docs.',
								items: {
									type: 'string',
									enum: ['sample', 'doc'],
								},
							},
							limit: {
								type: 'integer',
								minimum: 1,
								maximum: 100,
								description: 'Maximum number of items to return.',
							},
						},
						required: ['query'],
						additionalProperties: false,
					},
				],
			},
		},
		handler: async (args, context) => createSearchPayload(context.index, context.counts, normalizeSearchArguments(args)),
		contentFormatter: (payload, context) => createToolTextContent(createSearchToolResult(payload, context)),
		aliases: ['search-samples', 'search-docs'],
	},
	{
		definition: {
			name: 'fetch',
			description: 'Retrieves the full text content for a sample or documentation entry by identifier.',
			input_schema: {
				oneOf: [
					{
						type: 'string',
						description: 'Identifier of the entry such as sample/button/basic or doc/README.',
					},
					{
						type: 'object',
						properties: {
							id: {
								type: 'string',
								description: 'Identifier of the entry such as sample/button/basic or doc/README.',
							},
						},
						required: ['id'],
						additionalProperties: false,
					},
				],
			},
		},
		handler: async (args, context) => {
			const id = resolveIdFromArguments(args);
			if (!id) {
				throw new ToolExecutionError(JSON_RPC_ERROR_CODES.INVALID_PARAMS, 'The "id" parameter must be a non-empty string.');
			}

			const entry = context.index.get(id);
			if (!entry) {
				throw new ToolExecutionError(TOOL_ERROR_CODES.NOT_FOUND, `Entry not found: ${id}`, { id });
			}

			return createFetchToolPayload(entry, context.index);
		},
		contentFormatter: (payload) => createToolTextContent(payload),
	},
	{
		definition: {
			name: 'list-samples',
			description: 'Lists KoliBri component samples with optional filtering.',
			input_schema: {
				type: 'object',
				properties: {
					query: {
						type: 'string',
						description: 'Optional filter applied to the sample id, group, or name.',
					},
					limit: {
						type: 'integer',
						minimum: 1,
						maximum: 100,
						description: 'Maximum number of samples to return.',
					},
				},
				required: [],
				additionalProperties: false,
			},
		},
		handler: async (args, context) => {
			const normalizedArgs = isPlainObject(args) ? args : {};
			return createSamplesListPayload(context.index, context.counts, {
				...normalizedArgs,
				includeMatchCount: true,
			});
		},
	},
	{
		definition: {
			name: 'get-sample',
			description: 'Retrieves the full source code for a single sample entry.',
			input_schema: {
				type: 'object',
				properties: {
					id: {
						type: 'string',
						description: 'Sample identifier such as sample/button/basic.',
					},
				},
				required: ['id'],
				additionalProperties: false,
			},
		},
		handler: async (args, context) => {
			const id = typeof args?.id === 'string' ? args.id.trim() : '';
			if (!id) {
				throw new ToolExecutionError(JSON_RPC_ERROR_CODES.INVALID_PARAMS, 'The "id" parameter must be a non-empty string.');
			}
			const entry = context.index.get(id);
			if (!entry || (entry.kind ?? 'sample') !== 'sample') {
				throw new ToolExecutionError(TOOL_ERROR_CODES.NOT_FOUND, `Sample not found: ${id}`, { id });
			}
			return createSampleDetailPayload(entry, context.index);
		},
	},
	{
		definition: {
			name: 'list-docs',
			description: 'Lists Markdown documentation entries with optional filtering.',
			input_schema: {
				type: 'object',
				properties: {
					query: {
						type: 'string',
						description: 'Optional filter applied to the doc id or title.',
					},
					limit: {
						type: 'integer',
						minimum: 1,
						maximum: 100,
						description: 'Maximum number of docs to return.',
					},
				},
				required: [],
				additionalProperties: false,
			},
		},
		handler: async (args, context) => {
			const normalizedArgs = isPlainObject(args) ? args : {};
			return createDocsListPayload(context.index, context.counts, {
				...normalizedArgs,
				includeMatchCount: true,
			});
		},
	},
	{
		definition: {
			name: 'get-doc',
			description: 'Returns the Markdown content for a documentation entry.',
			input_schema: {
				type: 'object',
				properties: {
					id: {
						type: 'string',
						description: 'Documentation identifier such as doc/README.',
					},
				},
				required: ['id'],
				additionalProperties: false,
			},
		},
		handler: async (args, context) => {
			const id = typeof args?.id === 'string' ? args.id.trim() : '';
			if (!id) {
				throw new ToolExecutionError(JSON_RPC_ERROR_CODES.INVALID_PARAMS, 'The "id" parameter must be a non-empty string.');
			}
			const entry = context.index.get(id);
			if (!entry || (entry.kind ?? 'doc') !== 'doc') {
				throw new ToolExecutionError(TOOL_ERROR_CODES.NOT_FOUND, `Documentation entry not found: ${id}`, { id });
			}
			return createDocDetailPayload(entry, context.index);
		},
	},
	{
		definition: {
			name: 'get-health',
			description: 'Returns the current health status and content counters of the MCP server.',
			input_schema: {
				type: 'object',
				properties: {},
				required: [],
				additionalProperties: false,
			},
		},
		handler: async (args, context) => createHealthPayload(context.index, context.counts),
		aliases: ['health'],
	},
]);

function buildToolRegistry(entries) {
	const lookup = new Map();
	const definitions = [];

	for (const entry of entries) {
		definitions.push(entry.definition);

		const register = (name) => {
			if (!name) {
				return;
			}

			const normalized = `${name}`.trim();
			if (!normalized) {
				return;
			}

			lookup.set(normalized, entry);
			lookup.set(normalized.toLowerCase(), entry);
		};

		register(entry.definition.name);
		for (const alias of entry.aliases ?? []) {
			register(alias);
		}
	}

	return { definitions: Object.freeze(definitions), lookup };
}

const { definitions: TOOL_DEFINITIONS, lookup: TOOL_LOOKUP } = buildToolRegistry(TOOL_ENTRIES);

function buildJsonRpcResult(id, result) {
	return { jsonrpc: JSON_RPC_VERSION, id: id ?? null, result };
}

function buildJsonRpcError(id, code, message, data) {
	return {
		jsonrpc: JSON_RPC_VERSION,
		id: id ?? null,
		error: { code, message, data },
	};
}

async function executeJsonRpcRequest(request, context) {
	if (!isPlainObject(request) || request.jsonrpc !== JSON_RPC_VERSION || typeof request.method !== 'string') {
		return buildJsonRpcError(null, JSON_RPC_ERROR_CODES.INVALID_REQUEST, 'Invalid request.');
	}

	const id = Object.prototype.hasOwnProperty.call(request, 'id') ? request.id : null;

	try {
		switch (request.method) {
			case 'initialize': {
				const index = await context.getIndex();
				const counts = resolveCounts(index);
				return buildJsonRpcResult(id, createInitializePayload(index, counts));
			}
			case 'tools/list': {
				return buildJsonRpcResult(id, { tools: TOOL_DEFINITIONS });
			}
			case 'tools/call': {
				const params = isPlainObject(request.params) ? request.params : {};
				const rawName = typeof params.name === 'string' ? params.name.trim() : '';
				if (!rawName) {
					return buildJsonRpcError(id, JSON_RPC_ERROR_CODES.INVALID_PARAMS, 'Invalid params: "name" must be provided.');
				}

				const tool = context.toolLookup.get(rawName) ?? context.toolLookup.get(rawName.toLowerCase());
				if (!tool) {
					return buildJsonRpcError(id, JSON_RPC_ERROR_CODES.METHOD_NOT_FOUND, `Tool not found: ${rawName}`);
				}

				const args = Object.prototype.hasOwnProperty.call(params, 'arguments') ? params.arguments : {};
				const index = await context.getIndex();
				const counts = resolveCounts(index);

				try {
					const payload = await tool.handler(args, { index, counts });
					const content = tool.contentFormatter ? tool.contentFormatter(payload, { index, counts }) : [{ type: 'json', json: payload }];
					return buildJsonRpcResult(id, {
						tool: tool.definition.name,
						content,
					});
				} catch (error) {
					if (error instanceof ToolExecutionError) {
						return buildJsonRpcError(id, error.code, error.message, error.data);
					}

					console.error('[mcp] tool execution failed', error);
					return buildJsonRpcError(id, JSON_RPC_ERROR_CODES.INTERNAL_ERROR, 'Tool execution failed.', { message: error.message });
				}
			}
			default: {
				return buildJsonRpcError(id, JSON_RPC_ERROR_CODES.METHOD_NOT_FOUND, `Method not found: ${request.method}`);
			}
		}
	} catch (error) {
		console.error('[mcp] json-rpc handling failed', error);
		return buildJsonRpcError(id, JSON_RPC_ERROR_CODES.INTERNAL_ERROR, 'Internal error.', { message: error.message });
	}
}

async function executeJsonRpcBatch(requests, context) {
	const responses = [];

	for (const request of requests) {
		const response = await executeJsonRpcRequest(request, context);
		if (response !== null) {
			responses.push(response);
		}
	}

	return responses;
}

function shouldAttemptJsonRpc(method, body) {
	if (method !== 'POST') {
		return false;
	}

	if (!body) {
		return false;
	}

	const trimmed = body.trim();
	if (!trimmed) {
		return false;
	}

	return trimmed.includes('"jsonrpc"');
}

function resolveRequestContext(pathname = '/') {
	const normalized = pathname || '/';
	const mappings = [
		{ mode: TRANSPORT_MODES.HTTP, prefix: TRANSPORT_PATHS.http },
		{ mode: TRANSPORT_MODES.SSE, prefix: TRANSPORT_PATHS.sse },
	];

	for (const { mode, prefix } of mappings) {
		if (normalized === prefix || normalized.startsWith(`${prefix}/`)) {
			const suffix = normalized.slice(prefix.length) || '/';
			const normalizedSuffix = suffix.startsWith('/') ? suffix : `/${suffix}`;
			return { pathname: normalizedSuffix, transportMode: mode };
		}
	}

	return { pathname: normalized, transportMode: TRANSPORT_MODES.HTTP };
}

export async function handleApiRequest({ method = 'GET', url = '/', headers = {}, body = '', getIndex } = {}) {
	const startTime = Date.now();
	const baseHeaders = buildCorsHeaders();
	const normalizedMethod = method.toUpperCase();
	const requestUrl = new URL(url, 'http://localhost');
	const { pathname, transportMode } = resolveRequestContext(requestUrl.pathname);
	const acceptsHeader = `${headers.accept ?? ''}`.toLowerCase();
	let wantsStream =
		acceptsHeader.includes('text/event-stream') ||
		['1', 'true', 'yes'].includes((requestUrl.searchParams.get('stream') ?? '').toLowerCase()) ||
		(requestUrl.searchParams.get('format') ?? '').toLowerCase() === 'sse';

	if (transportMode === TRANSPORT_MODES.HTTP) {
		wantsStream = false;
	} else if (transportMode === TRANSPORT_MODES.SSE) {
		wantsStream = true;
	}

	const finalizeResponse = (statusCode, { body: responseBody, headers: extraHeaders = {}, stream } = {}) => {
		const responseTime = Date.now() - startTime;
		logRequest(normalizedMethod, url, pathname, statusCode, responseTime);
		return {
			statusCode,
			headers: { ...baseHeaders, ...extraHeaders },
			body: responseBody,
			stream,
		};
	};

	const createResponse = (statusCode, responseBody = {}, headersOverride = {}) =>
		finalizeResponse(statusCode, {
			body: responseBody,
			headers: headersOverride,
		});

	const createStreamResponse = (statusCode, { meta = {}, items = [], itemEventName = 'item' } = {}) =>
		finalizeResponse(statusCode, {
			headers: { ...STREAMING_HEADERS },
			stream: createSseStream({ meta, items, itemEventName }),
		});

	const rawBody = typeof body === 'string' ? body : body ? `${body}` : '';
	const shouldParseJsonRpc = shouldAttemptJsonRpc(normalizedMethod, rawBody);

	if (shouldParseJsonRpc) {
		let parsedBody;
		try {
			parsedBody = JSON.parse(rawBody.trim());
		} catch (parseError) {
			return finalizeResponse(400, {
				headers: { 'Content-Type': JSON_RPC_CONTENT_TYPE },
				body: buildJsonRpcError(null, JSON_RPC_ERROR_CODES.PARSE_ERROR, 'Parse error.'),
			});
		}

		const rpcContext = { getIndex, toolLookup: TOOL_LOOKUP };
		if (Array.isArray(parsedBody)) {
			if (parsedBody.length === 0) {
				return finalizeResponse(400, {
					headers: { 'Content-Type': JSON_RPC_CONTENT_TYPE },
					body: buildJsonRpcError(null, JSON_RPC_ERROR_CODES.INVALID_REQUEST, 'Invalid request: empty batch.'),
				});
			}

			const responses = await executeJsonRpcBatch(parsedBody, rpcContext);
			if (responses.length === 0) {
				return finalizeResponse(204);
			}

			return finalizeResponse(200, {
				headers: { 'Content-Type': JSON_RPC_CONTENT_TYPE },
				body: responses,
			});
		}

		const response = await executeJsonRpcRequest(parsedBody, rpcContext);
		if (response === null) {
			return finalizeResponse(204);
		}

		return finalizeResponse(200, {
			headers: { 'Content-Type': JSON_RPC_CONTENT_TYPE },
			body: response,
		});
	}

	if (normalizedMethod === 'OPTIONS') {
		return createResponse(204);
	}

	if ((normalizedMethod === 'GET' || normalizedMethod === 'POST') && pathname === '/') {
		let index;
		try {
			index = await getIndex();
		} catch (error) {
			console.warn('[root] Unable to load index for overview response:', error);
		}

		const counts = resolveCounts(index);
		const bodyPayload = createOverviewPayload(index, counts);

		if (wantsStream) {
			return createStreamResponse(200, {
				meta: {
					endpoint: '/',
					method: normalizedMethod,
					totalEntries: counts.total,
					totalSamples: counts.totalSamples,
					totalDocs: counts.totalDocs,
				},
				items: [bodyPayload],
				itemEventName: 'overview',
			});
		}

		return createResponse(200, bodyPayload);
	}

	if ((normalizedMethod === 'POST' || normalizedMethod === 'GET') && pathname === '/initialize') {
		const index = await getIndex();
		const counts = resolveCounts(index);
		const bodyPayload = createInitializePayload(index, counts);

		if (wantsStream) {
			return createStreamResponse(200, {
				meta: {
					endpoint: '/initialize',
					method: normalizedMethod,
					totals: bodyPayload.totals,
				},
				items: [bodyPayload],
				itemEventName: 'initialize',
			});
		}

		return createResponse(200, bodyPayload);
	}

	if (normalizedMethod === 'GET' && pathname === '/health') {
		const index = await getIndex();
		const counts = resolveCounts(index);
		const bodyPayload = createHealthPayload(index, counts);

		console.log('[health] Total entries:', counts.total);
		console.log('[health] Sample entries:', counts.totalSamples);
		console.log('[health] Doc entries:', counts.totalDocs);
		console.log('[health] Index generated at:', index.generatedAt);
		console.log('[health] Is healthy:', bodyPayload.healthy);

		if (wantsStream) {
			return createStreamResponse(bodyPayload.healthy ? 200 : 503, {
				meta: {
					endpoint: '/health',
					method: normalizedMethod,
					healthy: bodyPayload.healthy,
				},
				items: [bodyPayload],
				itemEventName: 'health',
			});
		}

		return createResponse(bodyPayload.healthy ? 200 : 503, bodyPayload);
	}

	if (normalizedMethod === 'GET' && pathname === '/samples') {
		const index = await getIndex();
		const counts = resolveCounts(index);
		const query = requestUrl.searchParams.get('q') ?? '';
		const payload = createSamplesListPayload(index, counts, { query });
		const meta = {
			query: payload.query,
			total: payload.total,
			totalEntries: counts.total,
			totalSamples: counts.totalSamples,
			totalDocs: counts.totalDocs,
			generatedAt: payload.generatedAt,
		};

		if (wantsStream) {
			return createStreamResponse(200, {
				meta,
				items: payload.items,
				itemEventName: 'sample',
			});
		}

		return createResponse(200, { ...payload });
	}

	if (normalizedMethod === 'GET' && pathname === '/sample') {
		const index = await getIndex();
		const id = requestUrl.searchParams.get('id');
		if (!id) {
			const errorBody = { error: 'missing_id' };
			if (wantsStream) {
				return createStreamResponse(400, {
					meta: { endpoint: '/sample', method: normalizedMethod },
					items: [errorBody],
					itemEventName: 'sample',
				});
			}

			return createResponse(400, errorBody);
		}

		const entry = index.get(id);
		if (!entry) {
			const errorBody = { error: 'not_found', id };
			if (wantsStream) {
				return createStreamResponse(404, {
					meta: { endpoint: '/sample', method: normalizedMethod, id },
					items: [errorBody],
					itemEventName: 'sample',
				});
			}

			return createResponse(404, errorBody);
		}

		if ((entry.kind ?? 'sample') !== 'sample') {
			const errorBody = {
				error: 'invalid_kind',
				expected: 'sample',
				actual: entry.kind ?? 'sample',
				id,
			};
			if (wantsStream) {
				return createStreamResponse(400, {
					meta: { endpoint: '/sample', method: normalizedMethod, id },
					items: [errorBody],
					itemEventName: 'sample',
				});
			}

			return createResponse(400, errorBody);
		}

		const bodyPayload = createSampleDetailPayload(entry, index);

		if (wantsStream) {
			return createStreamResponse(200, {
				meta: { endpoint: '/sample', method: normalizedMethod, id },
				items: [bodyPayload],
				itemEventName: 'sample',
			});
		}

		return createResponse(200, bodyPayload);
	}

	if (normalizedMethod === 'GET' && pathname === '/docs') {
		const index = await getIndex();
		const counts = resolveCounts(index);
		const query = requestUrl.searchParams.get('q') ?? '';
		const payload = createDocsListPayload(index, counts, { query });
		const meta = {
			query: payload.query,
			total: payload.total,
			totalEntries: counts.totalDocs,
			totalDocs: counts.totalDocs,
			generatedAt: payload.generatedAt,
		};

		if (wantsStream) {
			return createStreamResponse(200, {
				meta,
				items: payload.items,
				itemEventName: 'doc',
			});
		}

		return createResponse(200, { ...payload });
	}

	if (normalizedMethod === 'GET' && pathname === '/doc') {
		const index = await getIndex();
		const id = requestUrl.searchParams.get('id');
		if (!id) {
			const errorBody = { error: 'missing_id' };
			if (wantsStream) {
				return createStreamResponse(400, {
					meta: { endpoint: '/doc', method: normalizedMethod },
					items: [errorBody],
					itemEventName: 'doc',
				});
			}

			return createResponse(400, errorBody);
		}

		const entry = index.get(id);
		if (!entry || (entry.kind ?? 'doc') !== 'doc') {
			const errorBody = { error: 'not_found', id };
			if (wantsStream) {
				return createStreamResponse(404, {
					meta: { endpoint: '/doc', method: normalizedMethod, id },
					items: [errorBody],
					itemEventName: 'doc',
				});
			}

			return createResponse(404, errorBody);
		}

		const bodyPayload = createDocDetailPayload(entry, index);

		if (wantsStream) {
			return createStreamResponse(200, {
				meta: { endpoint: '/doc', method: normalizedMethod, id },
				items: [bodyPayload],
				itemEventName: 'doc',
			});
		}

		return createResponse(200, bodyPayload);
	}

	if (normalizedMethod === 'POST' && pathname === '/refresh') {
		const bodyPayload = {
			error: 'refresh_unavailable',
			message: 'Die Re-Indexierung ist in bereitgestellten Umgebungen deaktiviert, da die Inhalte bereits vorab eingebettet werden.',
		};

		if (wantsStream) {
			return createStreamResponse(410, {
				meta: { endpoint: '/refresh', method: normalizedMethod },
				items: [bodyPayload],
				itemEventName: 'refresh',
			});
		}

		return createResponse(410, bodyPayload);
	}

	const fallbackBody = {
		error: 'not_found',
		endpoint: pathname,
		method: normalizedMethod,
	};
	if (wantsStream) {
		return createStreamResponse(404, {
			meta: { endpoint: pathname, method: normalizedMethod },
			items: [fallbackBody],
			itemEventName: 'error',
		});
	}

	return createResponse(404, fallbackBody);
}

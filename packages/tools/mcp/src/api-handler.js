import { createRequire } from 'node:module';
import { URL } from 'node:url';

const require = createRequire(import.meta.url);
const packageJson = require('../package.json');

const JSON_RPC_VERSION = '2.0';
const MCP_PROTOCOL_VERSION = '2024-11-05';
const SERVER_INFO = Object.freeze({
	name: 'kolibri-mcp',
	version: packageJson.version ?? '0.0.0',
});
const INITIALIZE_RESOURCE = Object.freeze({
	uri: 'kolibri://initialize',
	name: 'Getting started with the KoliBri MCP server',
	description: 'Overview, usage instructions, and REST endpoints for Codex and other MCP clients.',
	mimeType: 'text/markdown',
});

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

function toNonEmptyString(value) {
	if (typeof value !== 'string') {
		return undefined;
	}

	const trimmed = value.trim();
	return trimmed ? trimmed : undefined;
}

function resolveProtocolVersion(requestedVersion) {
	if (typeof requestedVersion === 'string') {
		return requestedVersion.trim() || MCP_PROTOCOL_VERSION;
	}

	if (typeof requestedVersion === 'number' && Number.isFinite(requestedVersion)) {
		return `${requestedVersion}`;
	}

	return MCP_PROTOCOL_VERSION;
}

function formatGeneratedAt(index) {
	if (index?.generatedAt instanceof Date) {
		return index.generatedAt.toISOString();
	}

	return new Date().toISOString();
}

function buildInitializeResourceText(index) {
	const counts = resolveCounts(index);
	const generatedAt = formatGeneratedAt(index);
	return [
		'# Welcome to the KoliBri MCP server',
		'',
		'This server exposes the KoliBri component and documentation samples to Model Context Protocol clients.',
		'',
		'## Getting started',
		'- Call `resources/list` to discover available resources.',
		`- Read the ${INITIALIZE_RESOURCE.uri} resource via resources/read for human-friendly usage instructions.`,
		'- Use the REST endpoints if your client prefers HTTP access over JSON-RPC.',
		'',
		'## REST endpoints',
		'- `GET /health` — Service health and index metadata.',
		'- `GET /samples` — List of component samples (filterable with `?q=`).',
		'- `GET /sample?id=sample/<component>/<sample>` — Retrieve a specific component sample.',
		'- `GET /docs` — List of documentation entries.',
		'- `GET /doc?id=doc/<identifier>` — Retrieve a specific documentation entry.',
		'',
		'## Sample statistics',
		`- Total entries: ${counts.total}`,
		`- Component samples: ${counts.totalSamples}`,
		`- Documentation entries: ${counts.totalDocs}`,
		`- Index generated at: ${generatedAt}`,
		'',
		'For more details, inspect the JSON payloads returned by the endpoints above or the metadata included in JSON-RPC responses.',
	].join('\n');
}

function buildInitializeResource(index) {
	const text = buildInitializeResourceText(index);
	return {
		...INITIALIZE_RESOURCE,
		size: Buffer.byteLength(text, 'utf8'),
	};
}

function normalizePathname(pathname) {
	if (pathname === '/') {
		return pathname;
	}
	const prefixes = ['/api/mcp', '/mcp'];

	for (const prefix of prefixes) {
		if (pathname.startsWith(prefix)) {
			const suffix = pathname.slice(prefix.length) || '/';
			return suffix.startsWith('/') ? suffix : `/${suffix}`;
		}
	}

	return pathname;
}

function resolveContentType(headers = {}) {
	for (const [name, value] of Object.entries(headers ?? {})) {
		if (typeof value === 'string' && name.toLowerCase() === 'content-type') {
			return value;
		}
	}

	return '';
}

function tryParseJsonBody(rawBody, contentType) {
	if (!rawBody) {
		return { value: undefined };
	}

	const normalized = typeof contentType === 'string' ? contentType.toLowerCase() : '';
	if (normalized && !normalized.includes('application/json')) {
		return { value: undefined };
	}

	try {
		return { value: JSON.parse(rawBody) };
	} catch (error) {
		return { error };
	}
}

function toJsonRpcRequest(payload) {
	if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
		return undefined;
	}

	if (payload.jsonrpc !== JSON_RPC_VERSION || typeof payload.method !== 'string') {
		return undefined;
	}

	return {
		id: Object.prototype.hasOwnProperty.call(payload, 'id') ? payload.id : undefined,
		method: payload.method,
		params: payload.params,
	};
}

function createJsonRpcSuccess(id, result) {
	return {
		jsonrpc: JSON_RPC_VERSION,
		id: id ?? null,
		result,
	};
}

function createJsonRpcError(id, code, message, data) {
	return {
		jsonrpc: JSON_RPC_VERSION,
		id: id ?? null,
		error: data
			? {
					code,
					message,
					data,
				}
			: {
					code,
					message,
				},
	};
}

async function handleJsonRpcRequest({ request, createResponse, getIndex }) {
	const { id, method, params } = request;

	switch (method) {
		case 'initialize': {
			let index;
			try {
				index = await getIndex();
			} catch (error) {
				console.warn('[rpc] Unable to load index during initialize:', error);
			}

			const counts = resolveCounts(index);
			const generatedAt = formatGeneratedAt(index);
			const resource = buildInitializeResource(index);

			return createResponse(
				200,
				createJsonRpcSuccess(id, {
					protocolVersion: resolveProtocolVersion(params?.protocolVersion),
					serverInfo: SERVER_INFO,
					capabilities: {
						resources: {
							subscribe: false,
							listChanged: false,
						},
					},
					instructions: 'Call resources/list followed by resources/read for kolibri://initialize to receive full usage guidance.',
					data: {
						totalEntries: counts.total,
						totalSamples: counts.totalSamples,
						totalDocs: counts.totalDocs,
						generatedAt,
						resources: [resource],
						restEndpoints: ['/health', '/samples', '/sample', '/docs', '/doc'],
					},
				}),
			);
		}
		case 'initialized': {
			if (id === undefined) {
				return createResponse(204);
			}

			return createResponse(200, createJsonRpcSuccess(id, null));
		}
		case 'resources/list': {
			if (id === undefined) {
				return createResponse(204);
			}

			let index;
			try {
				index = await getIndex();
			} catch (error) {
				console.warn('[rpc] Unable to load index during resources/list:', error);
			}

			return createResponse(
				200,
				createJsonRpcSuccess(id, {
					resources: [buildInitializeResource(index)],
					nextCursor: null,
				}),
			);
		}
		case 'resources/read': {
			if (id === undefined) {
				return createResponse(204);
			}

			const uri = toNonEmptyString(params?.uri);
			if (!uri) {
				return createResponse(200, createJsonRpcError(id, -32602, 'Missing required parameter "uri"'));
			}

			if (uri !== INITIALIZE_RESOURCE.uri) {
				return createResponse(200, createJsonRpcError(id, -32004, `Resource not found: ${uri}`, { uri }));
			}

			let index;
			try {
				index = await getIndex();
			} catch (error) {
				console.warn('[rpc] Unable to load index during resources/read:', error);
			}

			return createResponse(
				200,
				createJsonRpcSuccess(id, {
					contents: [
						{
							uri: INITIALIZE_RESOURCE.uri,
							mimeType: INITIALIZE_RESOURCE.mimeType,
							text: buildInitializeResourceText(index),
						},
					],
				}),
			);
		}
		default:
			if (id === undefined) {
				return createResponse(204);
			}

			return createResponse(200, createJsonRpcError(id, -32601, `Method not found: ${method}`));
	}
}

export async function handleApiRequest({ method = 'GET', url = '/', headers = {}, body = '', getIndex } = {}) {
	const startTime = Date.now();
	const baseHeaders = buildCorsHeaders();
	const normalizedMethod = method.toUpperCase();
	const requestUrl = new URL(url, 'http://localhost');
	const pathname = normalizePathname(requestUrl.pathname);
	const rawBody = typeof body === 'string' ? body : '';
	const contentType = resolveContentType(headers);
	const { value: parsedJsonBody, error: jsonError } = tryParseJsonBody(rawBody, contentType);
	const jsonRpcRequest = normalizedMethod === 'POST' ? toJsonRpcRequest(parsedJsonBody) : undefined;

	// Helper function to create response and log it
	const createResponse = (statusCode, body) => {
		const responseTime = Date.now() - startTime;
		logRequest(normalizedMethod, url, pathname, statusCode, responseTime);
		return {
			statusCode,
			headers: baseHeaders,
			body,
		};
	};

	if (normalizedMethod === 'OPTIONS') {
		return createResponse(204);
	}

	if (jsonError) {
		return createResponse(400, { error: 'invalid_json' });
	}

	if (jsonRpcRequest) {
		return handleJsonRpcRequest({ request: jsonRpcRequest, createResponse, getIndex });
	}

	if ((normalizedMethod === 'GET' || normalizedMethod === 'POST') && pathname === '/') {
		let index;
		try {
			index = await getIndex();
		} catch (error) {
			console.warn('[root] Unable to load index for overview response:', error);
		}

		const counts = resolveCounts(index);
		const generatedAt = index?.generatedAt instanceof Date ? index.generatedAt : undefined;

		return createResponse(
			200,
			withAiHints({
				message: 'KoliBri MCP backend is running.',
				endpoints: [
					'/health',
					'/samples',
					'/samples?q=<query>',
					'/sample?id=sample/<component>/<sample>',
					'/docs',
					'/docs?q=<query>',
					'/doc?id=doc/<identifier>',
				],
				resources: [INITIALIZE_RESOURCE.uri],
				totalEntries: counts.total,
				totalSamples: counts.totalSamples,
				totalDocs: counts.totalDocs,
				generatedAt: (generatedAt ?? new Date()).toISOString(),
				buildMode: index?.buildMode ?? 'runtime',
			}),
		);
	}

	if (normalizedMethod === 'GET' && pathname === '/health') {
		const index = await getIndex();
		const counts = resolveCounts(index);
		const isHealthy = counts.total > 0;

		// Debug information for Vercel
		console.log('[health] Total entries:', counts.total);
		console.log('[health] Sample entries:', counts.totalSamples);
		console.log('[health] Doc entries:', counts.totalDocs);
		console.log('[health] Index generated at:', index.generatedAt);
		console.log('[health] Is healthy:', isHealthy);

		return createResponse(isHealthy ? 200 : 503, {
			status: isHealthy ? 'ok' : 'error',
			healthy: isHealthy,
			totalEntries: counts.total,
			totalSamples: counts.totalSamples,
			totalDocs: counts.totalDocs,
			message: isHealthy ? `System healthy with ${counts.total} entries available` : 'No entries found - system may not be properly initialized',
			generatedAt: index.generatedAt.toISOString(),
			debug: {
				indexGeneratedAt: index.generatedAt.toISOString(),
				entriesLength: index.entries.length,
				firstFewEntries: index.entries.slice(0, 3).map((e) => e.id),
			},
		});
	}

	if (normalizedMethod === 'GET' && pathname === '/samples') {
		const index = await getIndex();
		const query = requestUrl.searchParams.get('q') ?? '';
		const items = index.list(query, { kinds: ['sample'] }).map((entry) => ({
			group: entry.group,
			id: entry.id,
			name: entry.name,
			path: entry.path,
			kind: entry.kind ?? 'sample',
		}));
		const counts = resolveCounts(index);
		return createResponse(200, {
			items,
			query,
			total: items.length,
			totalEntries: counts.total,
			totalSamples: counts.totalSamples,
			totalDocs: counts.totalDocs,
			generatedAt: index.generatedAt.toISOString(),
		});
	}

	if (normalizedMethod === 'GET' && pathname === '/sample') {
		const index = await getIndex();
		const id = requestUrl.searchParams.get('id');
		if (!id) {
			return createResponse(400, { error: 'missing_id' });
		}

		const entry = index.get(id);
		if (!entry) {
			return createResponse(404, { error: 'not_found', id });
		}

		if ((entry.kind ?? 'sample') !== 'sample') {
			return createResponse(400, { error: 'invalid_kind', expected: 'sample', actual: entry.kind ?? 'sample', id });
		}

		return createResponse(200, {
			id: entry.id,
			group: entry.group,
			name: entry.name,
			path: entry.path,
			code: entry.code,
			kind: entry.kind ?? 'sample',
		});
	}

	if (normalizedMethod === 'GET' && pathname === '/docs') {
		const index = await getIndex();
		const query = requestUrl.searchParams.get('q') ?? '';
		const items = index.list(query, { kinds: ['doc'] }).map((entry) => ({
			group: entry.group,
			id: entry.id,
			name: entry.name,
			path: entry.path,
			kind: entry.kind ?? 'doc',
		}));
		const counts = resolveCounts(index);
		return createResponse(200, {
			items,
			query,
			total: items.length,
			totalEntries: counts.total,
			totalSamples: counts.totalSamples,
			totalDocs: counts.totalDocs,
			generatedAt: index.generatedAt.toISOString(),
		});
	}

	if (normalizedMethod === 'GET' && pathname === '/doc') {
		const index = await getIndex();
		const id = requestUrl.searchParams.get('id');
		if (!id) {
			return createResponse(400, { error: 'missing_id' });
		}

		const entry = index.get(id);
		if (!entry || entry.kind !== 'doc') {
			return createResponse(404, { error: 'not_found', id });
		}

		return createResponse(200, {
			id: entry.id,
			group: entry.group,
			name: entry.name,
			path: entry.path,
			code: entry.code,
			kind: entry.kind ?? 'doc',
		});
	}

	if (normalizedMethod === 'POST' && pathname === '/refresh') {
		return createResponse(410, {
			error: 'refresh_unavailable',
			message: 'Die Re-Indexierung ist in bereitgestellten Umgebungen deaktiviert, da die Inhalte bereits vorab eingebettet werden.',
		});
	}

	return createResponse(404, { error: 'not_found', path: pathname });
}

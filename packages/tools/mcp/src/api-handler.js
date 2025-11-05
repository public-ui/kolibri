import { createRequire } from 'node:module';
import { URL } from 'node:url';

const require = createRequire(import.meta.url);
const { version: PACKAGE_VERSION, name: PACKAGE_NAME, description: PACKAGE_DESCRIPTION, homepage: PACKAGE_HOMEPAGE } = require('../package.json');

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

const STREAMING_HEADERS = {
	'Cache-Control': 'no-cache, no-transform',
	Connection: 'keep-alive',
	'Content-Type': 'text/event-stream; charset=utf-8',
	'X-Accel-Buffering': 'no',
};

const TRANSPORT_MODES = Object.freeze({
	AUTO: 'auto',
	HTTP: 'http',
	SSE: 'sse',
});

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

function resolveRequestContext(pathname = '/') {
	const normalized = pathname || '/';
	const mappings = [
		{ mode: TRANSPORT_MODES.AUTO, prefix: '/api/mcp' },
		{ mode: TRANSPORT_MODES.AUTO, prefix: '/mcp' },
		{ mode: TRANSPORT_MODES.HTTP, prefix: '/http' },
		{ mode: TRANSPORT_MODES.SSE, prefix: '/sse' },
	];

	for (const { mode, prefix } of mappings) {
		if (normalized === prefix || normalized.startsWith(`${prefix}/`)) {
			const suffix = normalized.slice(prefix.length) || '/';
			const normalizedSuffix = suffix.startsWith('/') ? suffix : `/${suffix}`;
			return { pathname: normalizedSuffix, transportMode: mode };
		}
	}

	return { pathname: normalized, transportMode: TRANSPORT_MODES.AUTO };
}

export async function handleApiRequest({ method = 'GET', url = '/', headers = {}, getIndex } = {}) {
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

	// Helper function to create response and log it
	const finalizeResponse = (statusCode, { body, headers: extraHeaders = {}, stream } = {}) => {
		const responseTime = Date.now() - startTime;
		logRequest(normalizedMethod, url, pathname, statusCode, responseTime);
		return {
			statusCode,
			headers: { ...baseHeaders, ...extraHeaders },
			body,
			stream,
		};
	};

	const createResponse = (statusCode, body = {}, headersOverride = {}) => finalizeResponse(statusCode, { body, headers: headersOverride });

	const createStreamResponse = (statusCode, { meta = {}, items = [], itemEventName = 'item' } = {}) =>
		finalizeResponse(statusCode, {
			headers: { ...STREAMING_HEADERS },
			stream: createSseStream({ meta, items, itemEventName }),
		});

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
		const generatedAt = index?.generatedAt instanceof Date ? index.generatedAt : undefined;

		return createResponse(
			200,
			withAiHints({
				message: 'KoliBri MCP backend is running.',
				endpoints: [
					'/initialize',
					'/health',
					'/samples',
					'/samples?q=<query>',
					'/samples?stream=1',
					'/sample?id=sample/<component>/<sample>',
					'/docs',
					'/docs?q=<query>',
					'/docs?stream=1',
					'/doc?id=doc/<identifier>',
				],
				transports: {
					auto: '/mcp',
					http: '/http',
					sse: '/sse',
				},
				totalEntries: counts.total,
				totalSamples: counts.totalSamples,
				totalDocs: counts.totalDocs,
				generatedAt: (generatedAt ?? new Date()).toISOString(),
				buildMode: index?.buildMode ?? 'runtime',
				streaming: { sse: true },
			}),
		);
	}

	if ((normalizedMethod === 'POST' || normalizedMethod === 'GET') && pathname === '/initialize') {
		const index = await getIndex();
		const counts = resolveCounts(index);
		const generatedAt = index.generatedAt instanceof Date ? index.generatedAt : new Date();

		return createResponse(
			200,
			withAiHints({
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
				},
				transports: {
					auto: '/mcp',
					http: '/http',
					sse: '/sse',
				},
				resources: [
					{
						id: 'samples',
						name: 'Component Samples',
						endpoint: '/samples',
						kind: 'collection',
						streaming: true,
						methods: ['GET'],
						params: ['q'],
					},
					{
						id: 'sample',
						name: 'Component Sample Detail',
						endpoint: '/sample',
						kind: 'item',
						streaming: false,
						methods: ['GET'],
						params: ['id'],
					},
					{
						id: 'docs',
						name: 'Documentation Entries',
						endpoint: '/docs',
						kind: 'collection',
						streaming: true,
						methods: ['GET'],
						params: ['q'],
					},
					{
						id: 'doc',
						name: 'Documentation Detail',
						endpoint: '/doc',
						kind: 'item',
						streaming: false,
						methods: ['GET'],
						params: ['id'],
					},
				],
				totals: {
					total: counts.total,
					samples: counts.totalSamples,
					docs: counts.totalDocs,
				},
				generatedAt: generatedAt.toISOString(),
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
		const meta = {
			query,
			total: items.length,
			totalEntries: counts.total,
			totalSamples: counts.totalSamples,
			totalDocs: counts.totalDocs,
			generatedAt: index.generatedAt.toISOString(),
		};

		if (wantsStream) {
			return createStreamResponse(200, {
				meta,
				items,
				itemEventName: 'sample',
			});
		}

		return createResponse(200, {
			items,
			...meta,
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
		const meta = {
			query,
			total: items.length,
			totalEntries: counts.totalDocs,
			totalDocs: counts.totalDocs,
			generatedAt: index.generatedAt.toISOString(),
		};

		if (wantsStream) {
			return createStreamResponse(200, {
				meta,
				items,
				itemEventName: 'doc',
			});
		}

		return createResponse(200, {
			items,
			...meta,
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

	return createResponse(404, { error: 'not_found' });
}

const AI_HINTS_KEY = 'ai-hints';
const AI_HINTS_MESSAGES = Object.freeze([
	'Always register KoliBri Web Components in the browser runtime before rendering them.',
	'Choose the integration guide that matches your project setup to load and bundle the components correctly.',
]);

const normalizeHints = (value) => {
	if (Array.isArray(value)) {
		return value.length > 0 ? value : AI_HINTS_MESSAGES;
	}

	if (typeof value === 'string') {
		const trimmed = value.trim();
		return trimmed ? [trimmed] : AI_HINTS_MESSAGES;
	}

	return AI_HINTS_MESSAGES;
};

const withAiHints = (body = {}) => ({ ...body, [AI_HINTS_KEY]: normalizeHints(body[AI_HINTS_KEY]) });

const JSON_METHODS = new Set(['POST', 'PUT', 'PATCH']);
const PATH_PREFIXES = ['/api/mcp', '/mcp'];

const BASE_CORS_HEADERS = Object.freeze({
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type, Authorization',
});

const computeCountsFromEntries = (entries = []) =>
	entries.reduce(
		(acc, entry) => {
			const kind = entry?.kind ?? 'sample';
			acc.total += 1;
			if (kind === 'sample') {
				acc.totalSamples += 1;
			} else if (kind === 'concept' || kind === 'doc') {
				acc.totalConcepts += 1;
				acc.totalDocs += 1;
			}
			return acc;
		},
		{ total: 0, totalSamples: 0, totalConcepts: 0, totalDocs: 0 },
	);

const resolveCounts = (index) => {
	if (!index) {
		return computeCountsFromEntries();
	}

	const fallbackCounts = computeCountsFromEntries(index.entries ?? []);
	const source = index.counts ?? {};

	return {
		total: typeof source.total === 'number' ? source.total : fallbackCounts.total,
		totalSamples: typeof source.totalSamples === 'number' ? source.totalSamples : fallbackCounts.totalSamples,
		totalConcepts: typeof source.totalConcepts === 'number' ? source.totalConcepts : fallbackCounts.totalConcepts,
		totalDocs: typeof source.totalDocs === 'number' ? source.totalDocs : fallbackCounts.totalDocs,
	};
};

const applyCorsHeaders = (response, headers = BASE_CORS_HEADERS) => {
	Object.entries(headers).forEach(([key, value]) => {
		response.setHeader(key, value);
	});
};

const normalizeRequestPath = (pathname) => {
	if (pathname === '/') {
		return pathname;
	}

	for (const prefix of PATH_PREFIXES) {
		if (pathname.startsWith(prefix)) {
			const suffix = pathname.slice(prefix.length) || '/';
			return suffix.startsWith('/') ? suffix : `/${suffix}`;
		}
	}

	return pathname;
};

const readJsonBody = (request) =>
	new Promise((resolve, reject) => {
		const chunks = [];

		request.on('data', (chunk) => {
			chunks.push(typeof chunk === 'string' ? Buffer.from(chunk, 'utf8') : chunk);
		});

		request.on('end', () => {
			if (chunks.length === 0) {
				resolve(undefined);
				return;
			}

			const raw = Buffer.concat(chunks).toString('utf8').trim();
			if (!raw) {
				resolve(undefined);
				return;
			}

			try {
				resolve(JSON.parse(raw));
			} catch (error) {
				const parseError = new SyntaxError('Invalid JSON body');
				parseError.code = 'INVALID_JSON_BODY';
				parseError.cause = error;
				reject(parseError);
			}
		});

		request.on('error', (error) => {
			reject(error);
		});
	});

const handleEventStream = async ({ request, response, getIndex }) => {
	response.status(200);
	applyCorsHeaders(response);
	response.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
	response.setHeader('Cache-Control', 'no-cache, no-transform');
	response.setHeader('Connection', 'keep-alive');
	response.flushHeaders?.();

	const send = (data) => {
		response.write(data);
	};

	send('event: ready\ndata: {}\n\n');

	try {
		const index = await getIndex();
		const counts = resolveCounts(index);
		const generatedAt = index?.generatedAt instanceof Date ? index.generatedAt.toISOString() : index?.generatedAt;
		const payload = {
			totalEntries: counts.total,
			totalSamples: counts.totalSamples,
			totalConcepts: counts.totalConcepts,
			totalDocs: counts.totalDocs,
			generatedAt,
			buildMode: index?.buildMode ?? 'runtime',
		};
		send(`event: resources/list_changed\ndata: ${JSON.stringify(payload)}\n\n`);
	} catch (error) {
		console.warn('[api/mcp] Unable to send SSE payload:', error);
	}

	const heartbeatInterval = setInterval(() => {
		send('event: heartbeat\ndata: {}\n\n');
	}, 15000);

	const cleanup = () => {
		clearInterval(heartbeatInterval);
		if (!response.writableEnded) {
			response.end();
		}
	};

	request.on('close', cleanup);
	request.on('error', cleanup);
	request.on('aborted', cleanup);
};

const resolveBodyOrRespond = async (bodyPromise, response) => {
	try {
		const value = await bodyPromise;
		return { ok: true, value };
	} catch (error) {
		if (error?.code === 'INVALID_JSON_BODY') {
			response.status(400);
			applyCorsHeaders(response);
			response.setHeader('Content-Type', 'application/json; charset=utf-8');
			response.json(
				withAiHints({
					error: 'invalid_json',
					message: 'Request body must be valid JSON.',
				}),
			);
			return { ok: false };
		}

		throw error;
	}
};

// Vercel Serverless Function für /api/mcp/*
export default async function handler(request, response) {
	const method = request.method ?? 'GET';
	const normalizedMethod = method.toUpperCase();

	applyCorsHeaders(response);

	if (normalizedMethod === 'OPTIONS') {
		response.status(204).end();
		return;
	}

	try {
		// Versuche eingebettete Sample-Daten zu laden (optimiert für Vercel)
		let samplesData;
		let useEmbeddedData = false;

		try {
			const samplesModule = await import('./samples.mjs');
			samplesData = samplesModule.samplesData;
			useEmbeddedData = true;
			console.log('[api/mcp] ✅ Using embedded samples:', samplesData.entries.length);
		} catch (samplesError) {
			console.log('[api/mcp] ⚠️ Could not load embedded samples:', samplesError.message);
			console.log('[api/mcp] Falling back to build artifacts...');
		}

		// URL für API Handler vorbereiten
		const baseUrl = `https://${request.headers.host}`;
		const fullUrl = new URL(request.url, baseUrl);
		const pathname = normalizeRequestPath(fullUrl.pathname);
		const bodyPromise = JSON_METHODS.has(normalizedMethod) ? readJsonBody(request) : Promise.resolve(undefined);

		if (useEmbeddedData) {
			// Verwende eingebettete Sample-Daten (schneller und zuverlässiger)
			const { handleApiRequest } = await import('../dist/index.mjs');

			// Erstelle Mock-Index mit eingebetteten Daten
			const counts = resolveCounts({ entries: samplesData.entries, counts: samplesData.counts });
			const mockIndex = {
				entries: samplesData.entries,
				map: new Map(samplesData.entries.map((entry) => [entry.id, entry])),
				generatedAt: new Date(samplesData.generatedAt),
				buildMode: samplesData.buildMode,
				counts,
				list: function (query, options = {}) {
					const kinds = options.kinds ? new Set(options.kinds) : undefined;
					const normalizeKind = (entry) => entry.kind ?? 'sample';
					let results = kinds ? this.entries.filter((entry) => kinds.has(normalizeKind(entry))) : this.entries;
					if (!query) {
						return results;
					}
					const normalized = query.trim().toLowerCase();
					return results.filter(
						(entry) =>
							entry.id.toLowerCase().includes(normalized) || entry.group.toLowerCase().includes(normalized) || entry.name.toLowerCase().includes(normalized),
					);
				},
				get: function (id) {
					return this.map.get(id);
				},
			};

			const getIndex = async () => mockIndex;

			if (normalizedMethod === 'GET' && pathname === '/events') {
				await handleEventStream({ request, response, getIndex });
				return;
			}

			const bodyResult = await resolveBodyOrRespond(bodyPromise, response);
			if (!bodyResult.ok) {
				return;
			}

			const body = bodyResult.value;

			const result = await handleApiRequest({
				method: request.method || 'GET',
				url: fullUrl.toString(),
				body,
				getIndex,
			});

			response.status(result.statusCode);
			Object.entries(result.headers).forEach(([key, value]) => {
				response.setHeader(key, value);
			});
			const responseBody = result.body ?? {};
			response.json(responseBody[AI_HINTS_KEY] ? responseBody : withAiHints(responseBody));
		} else {
			// Fallback: Verwende Build-Artefakte (kann auf Vercel problematisch sein)
			const { handleApiRequest, buildSampleIndex } = await import('../dist/index.mjs');

			// Index-Funktionen definieren (mit Runtime Discovery)
			let cachedIndex = null;
			const getIndex = async () => {
				if (!cachedIndex) {
					cachedIndex = await buildSampleIndex();
				}
				return cachedIndex;
			};

			if (normalizedMethod === 'GET' && pathname === '/events') {
				await handleEventStream({ request, response, getIndex });
				return;
			}

			const bodyResult = await resolveBodyOrRespond(bodyPromise, response);
			if (!bodyResult.ok) {
				return;
			}

			const body = bodyResult.value;

			// API Handler aufrufen
			const result = await handleApiRequest({
				method: request.method || 'GET',
				url: fullUrl.toString(),
				body,
				getIndex,
			});

			// Response senden
			response.status(result.statusCode);
			Object.entries(result.headers).forEach(([key, value]) => {
				response.setHeader(key, value);
			});
			const responseBody = result.body ?? {};
			response.json(responseBody[AI_HINTS_KEY] ? responseBody : withAiHints(responseBody));
		}
	} catch (error) {
		console.error('[api/mcp] Handler error:', error);

		// Fallback Error Response
		response.status(500);
		response.setHeader('Content-Type', 'application/json');
		response.json(
			withAiHints({
				error: 'Internal server error',
				message: error.message,
				timestamp: new Date().toISOString(),
			}),
		);
	}
}

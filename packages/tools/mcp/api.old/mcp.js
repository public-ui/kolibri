const AI_HINTS_KEY = 'ai-hints';
const AI_HINTS_MESSAGES = Object.freeze([
	'Always register KoliBri Web Components in the browser runtime before rendering them.',
	'Choose the integration guide that matches your project setup to load and bundle the components correctly.',
	'Bundle the KoliBri icon font assets (for example codicon.css and codicon.ttf) so kol-icon glyphs can render.',
	'Wrap input elements with <kol-form> and feed its _errorList to surface validation issues via the generated error summary.',
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

// Vercel Serverless Function für /api/mcp/*
export default async function handler(request, response) {
	// CORS Headers setzen
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
	response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	// OPTIONS Request für CORS Preflight
	if (request.method === 'OPTIONS') {
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

		if (useEmbeddedData) {
			// Verwende eingebettete Sample-Daten (schneller und zuverlässiger)
			const { handleApiRequest, performFuzzySearch, hasSearchableQuery } = await import('../dist/index.mjs');

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

					if (!hasSearchableQuery(query)) {
						return results;
					}

					return performFuzzySearch(results, query);
				},
				get: function (id) {
					return this.map.get(id);
				},
			};

			const getIndex = async () => mockIndex;

			const result = await handleApiRequest({
				method: request.method || 'GET',
				url: fullUrl.toString(),
				headers: request.headers || {},
				getIndex,
			});

			response.status(result.statusCode);
			Object.entries(result.headers).forEach(([key, value]) => {
				response.setHeader(key, value);
			});

			if (result.stream) {
				response.flushHeaders?.();
				try {
					for await (const chunk of result.stream) {
						response.write(chunk);
					}
				} finally {
					response.end();
				}
				return;
			}

			const responseBody = result.body ?? {};
			if (fullUrl.pathname === '/') {
				response.json(responseBody[AI_HINTS_KEY] ? responseBody : withAiHints(responseBody));
			} else {
				response.json(responseBody);
			}
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

			// API Handler aufrufen
			const result = await handleApiRequest({
				method: request.method || 'GET',
				url: fullUrl.toString(),
				headers: request.headers || {},
				getIndex,
			});

			// Response senden
			response.status(result.statusCode);
			Object.entries(result.headers).forEach(([key, value]) => {
				response.setHeader(key, value);
			});

			if (result.stream) {
				response.flushHeaders?.();
				try {
					for await (const chunk of result.stream) {
						response.write(chunk);
					}
				} finally {
					response.end();
				}
				return;
			}

			const responseBody = result.body ?? {};
			if (fullUrl.pathname === '/') {
				response.json(responseBody[AI_HINTS_KEY] ? responseBody : withAiHints(responseBody));
			} else {
				response.json(responseBody);
			}
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

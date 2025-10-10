import { URL } from 'node:url';

function buildCorsHeaders() {
	return {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type',
	};
}

export const AI_HINTS_KEY = 'ai-hints';
export const AI_HINTS_MESSAGES = Object.freeze([
	'Always register KoliBri Web Components in the browser runtime before rendering them.',
	'Choose the integration guide that matches your project setup to load and bundle the components correctly.',
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

export async function handleApiRequest({ method = 'GET', url = '/', getIndex } = {}) {
	const baseHeaders = buildCorsHeaders();
	const normalizedMethod = method.toUpperCase();
	const requestUrl = new URL(url, 'http://localhost');
	const pathname = normalizePathname(requestUrl.pathname);

	if (normalizedMethod === 'OPTIONS') {
		return { statusCode: 204, headers: baseHeaders };
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

		return {
			statusCode: 200,
			headers: baseHeaders,
			body: withAiHints({
				message: 'KoliBri MCP backend is running.',
				endpoints: ['/health', '/samples', '/sample?id=sample/<component>/<sample>', '/docs', '/doc?id=doc/<identifier>'],
				totalEntries: counts.total,
				totalSamples: counts.totalSamples,
				totalDocs: counts.totalDocs,
				generatedAt: (generatedAt ?? new Date()).toISOString(),
				buildMode: index?.buildMode ?? 'runtime',
			}),
		};
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

		return {
			statusCode: isHealthy ? 200 : 503,
			headers: baseHeaders,
			body: withAiHints({
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
			}),
		};
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
		return {
			statusCode: 200,
			headers: baseHeaders,
			body: withAiHints({
				items,
				query,
				total: items.length,
				totalEntries: counts.total,
				totalSamples: counts.totalSamples,
				totalDocs: counts.totalDocs,
				generatedAt: index.generatedAt.toISOString(),
			}),
		};
	}

	if (normalizedMethod === 'GET' && pathname === '/sample') {
		const index = await getIndex();
		const id = requestUrl.searchParams.get('id');
		if (!id) {
			return {
				statusCode: 400,
				headers: baseHeaders,
				body: withAiHints({ error: 'missing_id' }),
			};
		}

		const entry = index.get(id);
		if (!entry) {
			return {
				statusCode: 404,
				headers: baseHeaders,
				body: withAiHints({ error: 'not_found', id }),
			};
		}

		if ((entry.kind ?? 'sample') !== 'sample') {
			return {
				statusCode: 400,
				headers: baseHeaders,
				body: withAiHints({ error: 'invalid_kind', expected: 'sample', actual: entry.kind ?? 'sample', id }),
			};
		}

		return {
			statusCode: 200,
			headers: baseHeaders,
			body: withAiHints({
				id: entry.id,
				group: entry.group,
				name: entry.name,
				path: entry.path,
				code: entry.code,
				kind: entry.kind ?? 'sample',
			}),
		};
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
		return {
			statusCode: 200,
			headers: baseHeaders,
			body: withAiHints({
				items,
				query,
				total: items.length,
				totalEntries: counts.totalDocs,
				totalDocs: counts.totalDocs,
				generatedAt: index.generatedAt.toISOString(),
			}),
		};
	}

	if (normalizedMethod === 'GET' && pathname === '/doc') {
		const index = await getIndex();
		const id = requestUrl.searchParams.get('id');
		if (!id) {
			return {
				statusCode: 400,
				headers: baseHeaders,
				body: withAiHints({ error: 'missing_id' }),
			};
		}

		const entry = index.get(id);
		if (!entry || entry.kind !== 'doc') {
			return {
				statusCode: 404,
				headers: baseHeaders,
				body: withAiHints({ error: 'not_found', id }),
			};
		}

		return {
			statusCode: 200,
			headers: baseHeaders,
			body: withAiHints({
				id: entry.id,
				group: entry.group,
				name: entry.name,
				path: entry.path,
				code: entry.code,
				kind: entry.kind ?? 'doc',
			}),
		};
	}

	if (normalizedMethod === 'POST' && pathname === '/refresh') {
		return {
			statusCode: 410,
			headers: baseHeaders,
			body: withAiHints({
				error: 'refresh_unavailable',
				message: 'Die Re-Indexierung ist in bereitgestellten Umgebungen deaktiviert, da die Inhalte bereits vorab eingebettet werden.',
			}),
		};
	}

	return {
		statusCode: 404,
		headers: baseHeaders,
		body: withAiHints({ error: 'not_found' }),
	};
}

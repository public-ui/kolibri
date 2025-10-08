import { URL } from 'node:url';

function buildCorsHeaders() {
	return {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type',
	};
}

export const AI_HINTS_KEY = 'ai-hints';
export const AI_HINTS_MESSAGE =
	'KoliBri Web Components müssen im Browser registriert werden; abhängig vom Projekt-Setup stehen unterschiedliche Integrationswege bereit.';

function withAiHints(body = {}) {
	return { ...body, [AI_HINTS_KEY]: AI_HINTS_MESSAGE };
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

	if (normalizedMethod === 'GET' && pathname === '/') {
		return {
			statusCode: 200,
			headers: baseHeaders,
			body: withAiHints({
				message: 'KoliBri MCP backend is running.',
				endpoints: ['/health', '/samples', '/sample?id=sample/<component>/<sample>', '/concepts', '/concept?id=concept/<identifier>'],
			}),
		};
	}

	if (normalizedMethod === 'GET' && pathname === '/health') {
		const index = await getIndex();
		const counts = index.counts ?? {
			total: index.entries.length,
			totalSamples: index.entries.length,
			totalConcepts: 0,
			totalDocs: 0,
		};
		const isHealthy = counts.total > 0;

		// Debug information for Vercel
		console.log('[health] Total entries:', counts.total);
		console.log('[health] Sample entries:', counts.totalSamples);
		console.log('[health] Concept entries:', counts.totalConcepts ?? counts.totalDocs);
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
				totalConcepts: counts.totalConcepts ?? counts.totalDocs ?? 0,
				totalDocs: counts.totalDocs ?? counts.totalConcepts ?? 0,
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
		return {
			statusCode: 200,
			headers: baseHeaders,
			body: withAiHints({
				items,
				query,
				total: items.length,
				totalEntries: index.counts?.total ?? index.entries.length,
				totalSamples: index.counts?.totalSamples ?? index.entries.length,
				totalConcepts: index.counts?.totalConcepts ?? index.counts?.totalDocs ?? 0,
				totalDocs: index.counts?.totalDocs ?? index.counts?.totalConcepts ?? 0,
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

	if (normalizedMethod === 'GET' && pathname === '/concepts') {
		const index = await getIndex();
		const query = requestUrl.searchParams.get('q') ?? '';
		const items = index.list(query, { kinds: ['concept', 'doc'] }).map((entry) => ({
			group: entry.group,
			id: entry.id,
			name: entry.name,
			path: entry.path,
			kind: entry.kind ?? 'concept',
		}));
		return {
			statusCode: 200,
			headers: baseHeaders,
			body: withAiHints({
				items,
				query,
				total: items.length,
				totalEntries: index.counts?.totalConcepts ?? index.counts?.totalDocs ?? items.length,
				totalConcepts: index.counts?.totalConcepts ?? index.counts?.totalDocs ?? items.length,
				totalDocs: index.counts?.totalDocs ?? index.counts?.totalConcepts ?? items.length,
				generatedAt: index.generatedAt.toISOString(),
			}),
		};
	}

	if (normalizedMethod === 'GET' && pathname === '/concept') {
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
		if (!entry || !['concept', 'doc'].includes(entry.kind ?? 'sample')) {
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
				kind: entry.kind ?? 'concept',
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

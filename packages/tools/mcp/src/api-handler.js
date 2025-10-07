import { URL } from 'node:url';

function buildCorsHeaders() {
	return {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type',
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

export async function handleApiRequest({ method = 'GET', url = '/', getIndex, refresh }) {
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
			body: {
				message: 'KoliBri MCP backend is running.',
				endpoints: ['/health', '/samples', '/sample?id=<component/sample>'],
			},
		};
	}

	if (normalizedMethod === 'GET' && pathname === '/health') {
		const index = await getIndex();
		const counts = index.counts ?? {
			total: index.entries.length,
			totalSamples: index.entries.length,
			totalDocs: 0,
		};
		const isHealthy = counts.total > 0;

		// Debug information for Vercel
		console.log('[health] Total entries:', counts.total);
		console.log('[health] Sample entries:', counts.totalSamples);
		console.log('[health] Markdown entries:', counts.totalDocs);
		console.log('[health] Index generated at:', index.generatedAt);
		console.log('[health] Is healthy:', isHealthy);

		return {
			statusCode: isHealthy ? 200 : 503,
			headers: baseHeaders,
			body: {
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
			},
		};
	}
	if (normalizedMethod === 'GET' && pathname === '/samples') {
		const index = await getIndex();
		const query = requestUrl.searchParams.get('q') ?? '';
		const items = index.list(query).map((entry) => ({
			group: entry.group,
			id: entry.id,
			name: entry.name,
			path: entry.path,
			kind: entry.kind ?? 'sample',
		}));
		return {
			statusCode: 200,
			headers: baseHeaders,
			body: {
				items,
				query,
				total: items.length,
				totalEntries: index.counts?.total ?? index.entries.length,
				totalSamples: index.counts?.totalSamples ?? index.entries.length,
				totalDocs: index.counts?.totalDocs ?? 0,
				generatedAt: index.generatedAt.toISOString(),
			},
		};
	}

	if (normalizedMethod === 'GET' && pathname === '/sample') {
		const index = await getIndex();
		const id = requestUrl.searchParams.get('id');
		if (!id) {
			return {
				statusCode: 400,
				headers: baseHeaders,
				body: { error: 'missing_id' },
			};
		}

		const entry = index.get(id);
		if (!entry) {
			return {
				statusCode: 404,
				headers: baseHeaders,
				body: { error: 'not_found', id },
			};
		}

		return {
			statusCode: 200,
			headers: baseHeaders,
			body: {
				id: entry.id,
				group: entry.group,
				name: entry.name,
				path: entry.path,
				code: entry.code,
				kind: entry.kind ?? 'sample',
			},
		};
	}

	if (normalizedMethod === 'POST' && pathname === '/refresh') {
		try {
			const index = await refresh();
			const counts = index.counts ?? {
				total: index.entries.length,
				totalSamples: index.entries.length,
				totalDocs: 0,
			};
			return {
				statusCode: 200,
				headers: baseHeaders,
				body: {
					status: 'refreshed',
					totalEntries: counts.total,
					totalSamples: counts.totalSamples,
					totalDocs: counts.totalDocs,
					generatedAt: index.generatedAt.toISOString(),
				},
			};
		} catch (error) {
			console.error('[mcp] refresh failed', error);
			return {
				statusCode: 500,
				headers: baseHeaders,
				body: { error: 'refresh_failed' },
			};
		}
	}

	return {
		statusCode: 404,
		headers: baseHeaders,
		body: { error: 'not_found' },
	};
}

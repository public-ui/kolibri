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
	const prefixes = ['/api/mcp'];

	for (const prefix of prefixes) {
		if (pathname.startsWith(prefix)) {
			const suffix = pathname.slice(prefix.length) || '/';
			return suffix.startsWith('/') ? suffix : `/${suffix}`;
		}
	}

	return pathname;
}

export async function handleApiRequest({ method = 'GET', url = '/', headers = {}, getIndex, refresh }) {
	const baseHeaders = buildCorsHeaders();
	const normalizedMethod = method.toUpperCase();
	const requestUrl = new URL(url, 'http://localhost');
	const pathname = normalizePathname(requestUrl.pathname);
	const acceptHeader = headers.accept || headers.Accept || '';
	const preferHtml = acceptHeader.includes('text/html') && !acceptHeader.includes('application/json');

	if (normalizedMethod === 'OPTIONS') {
		return { statusCode: 204, headers: baseHeaders };
	}

	if (normalizedMethod === 'GET' && pathname === '/') {
		if (preferHtml) {
			// Return HTML for browser requests
			const htmlContent = `<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>KoliBri MCP</title>
		<style>
			body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 40px; }
			.container { max-width: 800px; margin: 0 auto; }
			h1 { color: #333; }
			.endpoint { background: #f5f5f5; padding: 10px; border-radius: 4px; margin: 8px 0; }
			.endpoint a { text-decoration: none; color: #0066cc; }
			.endpoint a:hover { text-decoration: underline; }
		</style>
	</head>
	<body>
		<div class="container">
			<h1>KoliBri Model Context Protocol</h1>
			<p>This is a serverless API providing KoliBri component samples to AI agents.</p>
			<h2>Available Endpoints:</h2>
			<div class="endpoint"><a href="/health">/health</a> - Health check and system status</div>
			<div class="endpoint"><a href="/samples">/samples</a> - List all available component samples</div>
			<div class="endpoint"><a href="/sample">/sample?id=&lt;component/sample&gt;</a> - Get specific sample code</div>
			<div class="endpoint">/refresh (POST) - Refresh the sample index cache</div>
			<h2>API Usage:</h2>
			<p>For programmatic access, send requests with <code>Accept: application/json</code> header to get JSON responses.</p>
		</div>
	</body>
</html>`;
			return {
				statusCode: 200,
				headers: { ...baseHeaders, 'Content-Type': 'text/html; charset=utf-8' },
				body: htmlContent,
			};
		}

		// Return JSON for API requests
		return {
			statusCode: 200,
			headers: { ...baseHeaders, 'Content-Type': 'application/json' },
			body: {
				message: 'KoliBri MCP backend is running.',
				endpoints: ['/health', '/samples', '/sample?id=<component/sample>', '/refresh (POST)'],
			},
		};
	}

	if (normalizedMethod === 'GET' && pathname === '/health') {
		const index = await getIndex();
		return {
			statusCode: 200,
			headers: { ...baseHeaders, 'Content-Type': 'application/json' },
			body: {
				status: 'ok',
				totalSamples: index.entries.length,
				generatedAt: index.generatedAt.toISOString(),
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
		}));
		return {
			statusCode: 200,
			headers: { ...baseHeaders, 'Content-Type': 'application/json' },
			body: {
				items,
				query,
				total: items.length,
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
				headers: { ...baseHeaders, 'Content-Type': 'application/json' },
				body: { error: 'missing_id' },
			};
		}

		const entry = index.get(id);
		if (!entry) {
			return {
				statusCode: 404,
				headers: { ...baseHeaders, 'Content-Type': 'application/json' },
				body: { error: 'not_found', id },
			};
		}

		return {
			statusCode: 200,
			headers: { ...baseHeaders, 'Content-Type': 'application/json' },
			body: {
				id: entry.id,
				group: entry.group,
				name: entry.name,
				path: entry.path,
				code: entry.code,
			},
		};
	}

	if (normalizedMethod === 'POST' && pathname === '/refresh') {
		try {
			const index = await refresh();
			return {
				statusCode: 200,
				headers: { ...baseHeaders, 'Content-Type': 'application/json' },
				body: {
					status: 'refreshed',
					totalSamples: index.entries.length,
					generatedAt: index.generatedAt.toISOString(),
				},
			};
		} catch (error) {
			console.error('[mcp] refresh failed', error);
			return {
				statusCode: 500,
				headers: { ...baseHeaders, 'Content-Type': 'application/json' },
				body: { error: 'refresh_failed' },
			};
		}
	}

	return {
		statusCode: 404,
		headers: { ...baseHeaders, 'Content-Type': 'application/json' },
		body: { error: 'not_found' },
	};
}

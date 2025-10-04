import { createServer } from 'node:http';
import { URL } from 'node:url';

import { buildSampleIndex } from './sample-index.js';

const DEFAULT_PORT = Number.parseInt(process.env.PORT ?? '3030', 10);

export async function startServer(options = {}) {
	const port = Number.parseInt(`${options.port ?? DEFAULT_PORT}`, 10);
	let index = await buildSampleIndex();

	const server = createServer((request, response) => {
		const handler = handleRequest(
			request,
			response,
			() => index,
			() => rebuild(),
		);
		Promise.resolve(handler).catch((error) => {
			console.error('[mcp] request failed', error);
			if (!response.headersSent) {
				respondJson(response, 500, { error: 'internal_error' });
			}
		});
	});

	server.listen(port, () => {
		console.log(`[mcp] server listening on http://localhost:${port}`);
	});

	async function rebuild() {
		index = await buildSampleIndex();
		return index;
	}

	return server;
}

function handleRequest(request, response, getIndex, refresh) {
	setCorsHeaders(response);

	if (request.method === 'OPTIONS') {
		response.statusCode = 204;
		response.end();
		return;
	}

	const url = new URL(request.url ?? '/', 'http://localhost');

	if (request.method === 'GET' && url.pathname === '/') {
		return respondJson(response, 200, {
			message: 'KoliBri MCP backend is running.',
			endpoints: ['/health', '/samples', '/sample?id=<component/sample>'],
		});
	}

	if (request.method === 'GET' && url.pathname === '/health') {
		const index = getIndex();
		return respondJson(response, 200, {
			status: 'ok',
			totalSamples: index.entries.length,
			generatedAt: index.generatedAt.toISOString(),
		});
	}

	if (request.method === 'GET' && url.pathname === '/samples') {
		const index = getIndex();
		const query = url.searchParams.get('q') ?? '';
		const results = index.list(query).map((entry) => ({
			group: entry.group,
			id: entry.id,
			name: entry.name,
			path: entry.path,
		}));
		return respondJson(response, 200, {
			items: results,
			query,
			total: results.length,
			generatedAt: index.generatedAt.toISOString(),
		});
	}

	if (request.method === 'GET' && url.pathname === '/sample') {
		const index = getIndex();
		const id = url.searchParams.get('id');
		if (!id) {
			return respondJson(response, 400, { error: 'missing_id' });
		}

		const entry = index.get(id);
		if (!entry) {
			return respondJson(response, 404, { error: 'not_found', id });
		}

		return respondJson(response, 200, {
			id: entry.id,
			group: entry.group,
			name: entry.name,
			path: entry.path,
			code: entry.code,
		});
	}

	if (request.method === 'POST' && url.pathname === '/refresh') {
		return refresh()
			.then((index) =>
				respondJson(response, 200, {
					status: 'refreshed',
					totalSamples: index.entries.length,
					generatedAt: index.generatedAt.toISOString(),
				}),
			)
			.catch((error) => {
				console.error('[mcp] refresh failed', error);
				respondJson(response, 500, { error: 'refresh_failed' });
			});
	}

	return respondJson(response, 404, { error: 'not_found' });
}

function respondJson(response, statusCode, payload) {
	if (!response.headersSent) {
		response.statusCode = statusCode;
		response.setHeader('Content-Type', 'application/json; charset=utf-8');
	}
	response.end(JSON.stringify(payload, null, 2));
}

function setCorsHeaders(response) {
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
	response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

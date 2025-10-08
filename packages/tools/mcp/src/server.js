import { createServer } from 'node:http';
import { URL } from 'node:url';
import { buildSampleIndex } from './sample-index.js';
import { handleApiRequest } from './api-handler.js';

const DEFAULT_PORT = Number.parseInt(process.env.PORT ?? '3030', 10);
const JSON_METHODS = new Set(['POST', 'PUT', 'PATCH']);
const PATH_PREFIXES = ['/api/mcp', '/mcp'];

const BASE_CORS_HEADERS = Object.freeze({
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type, Authorization',
});

export async function startServer(options = {}) {
	const port = Number.parseInt(`${options.port ?? DEFAULT_PORT}`, 10);
	let index = await buildSampleIndex();

	const server = createServer((request, response) => {
		const method = request.method ?? 'GET';
		const url = request.url ?? '/';
		const normalizedMethod = method.toUpperCase();
		const requestUrl = new URL(url, 'http://localhost');
		const pathname = normalizeRequestPath(requestUrl.pathname);

		if (normalizedMethod === 'GET' && pathname === '/events') {
			handleEventStream({ request, response, getIndex: () => index });
			return;
		}

		const readBody = JSON_METHODS.has(normalizedMethod) ? readJsonBody(request) : Promise.resolve(undefined);

		readBody
			.then((body) =>
				handleApiRequest({
					method,
					url,
					body,
					getIndex: () => index,
				}),
			)
			.then((result) => respondWithResult(response, result))
			.catch((error) => {
				if (error?.code === 'INVALID_JSON_BODY') {
					respondWithResult(response, {
						statusCode: 400,
						headers: BASE_CORS_HEADERS,
						body: { error: 'invalid_json', message: 'Request body must be valid JSON.' },
					});
					return;
				}

				console.error('[mcp] request failed', error);
				if (!response.headersSent) {
					respondWithResult(response, {
						statusCode: 500,
						headers: BASE_CORS_HEADERS,
						body: { error: 'internal_error' },
					});
				}
			});
	});

	server.listen(port, () => {
		console.log(`[mcp] server listening on http://localhost:${port}`);
	});

	return server;
}

function respondWithResult(response, result) {
	if (response.headersSent) {
		return;
	}

	response.statusCode = result.statusCode;
	const headers = {
		'Content-Type': 'application/json; charset=utf-8',
		...result.headers,
	};

	for (const [name, value] of Object.entries(headers)) {
		response.setHeader(name, value);
	}

	if (result.body === undefined) {
		response.end();
		return;
	}

	response.end(JSON.stringify(result.body, null, 2));
}

function normalizeRequestPath(pathname) {
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
}

function readJsonBody(request) {
	return new Promise((resolve, reject) => {
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
}

function handleEventStream({ request, response, getIndex }) {
	if (response.headersSent) {
		return;
	}

	response.writeHead(200, {
		...BASE_CORS_HEADERS,
		'Content-Type': 'text/event-stream; charset=utf-8',
		'Cache-Control': 'no-cache, no-transform',
		Connection: 'keep-alive',
	});

	const send = (data) => {
		response.write(data);
	};

	send('event: ready\ndata: {}\n\n');

	Promise.resolve()
		.then(() => getIndex())
		.then((index) => {
			const generatedAt = index?.generatedAt instanceof Date ? index.generatedAt.toISOString() : undefined;
			const payload = {
				totalEntries: index?.entries?.length ?? 0,
				buildMode: index?.buildMode ?? 'runtime',
				generatedAt,
			};
			send(`event: resources/list_changed\ndata: ${JSON.stringify(payload)}\n\n`);
		})
		.catch((error) => {
			console.warn('[sse] Unable to send initial index metadata:', error);
		});

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
}

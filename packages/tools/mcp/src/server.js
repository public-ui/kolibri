import { createServer } from 'node:http';
import { buildSampleIndex } from './sample-index.js';
import { handleApiRequest } from './api-handler.js';

const DEFAULT_PORT = Number.parseInt(process.env.PORT ?? '3030', 10);

export async function startServer(options = {}) {
	const port = Number.parseInt(`${options.port ?? DEFAULT_PORT}`, 10);
	let index = await buildSampleIndex();

	const server = createServer((request, response) => {
		Promise.resolve(
			handleApiRequest({
				method: request.method ?? 'GET',
				url: request.url ?? '/',
				headers: request.headers || {},
				getIndex: () => index,
				refresh: () => rebuild(),
			}),
		)
			.then((result) => respondWithResult(response, result))
			.catch((error) => {
				console.error('[mcp] request failed', error);
				if (!response.headersSent) {
					respondWithResult(response, {
						statusCode: 500,
						headers: {
							'Access-Control-Allow-Origin': '*',
							'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
							'Access-Control-Allow-Headers': 'Content-Type',
						},
						body: { error: 'internal_error' },
					});
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

	// Check if the response is HTML
	const contentType = response.getHeader('Content-Type') || '';
	if (contentType.includes('text/html')) {
		response.end(result.body);
	} else {
		response.end(JSON.stringify(result.body, null, 2));
	}
}

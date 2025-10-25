import { createServer } from 'node:http';
import { handleApiRequest } from './api-handler.js';
import { buildSampleIndex } from './sample-index.js';

const DEFAULT_PORT = Number.parseInt(process.env.PORT ?? '3030', 10);

export async function startServer(options = {}) {
	const port = Number.parseInt(`${options.port ?? DEFAULT_PORT}`, 10);
	let index = await buildSampleIndex();

	const server = createServer((request, response) => {
		const chunks = [];
		request.on('data', (chunk) => {
			chunks.push(chunk);
		});
		request.on('end', () => {
			const rawBody = chunks.length > 0 ? Buffer.concat(chunks).toString('utf8') : '';
			Promise.resolve(
				handleApiRequest({
					method: request.method ?? 'GET',
					url: request.url ?? '/',
					headers: request.headers ?? {},
					body: rawBody,
					getIndex: () => index,
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
		request.on('error', (error) => {
			console.error('[mcp] request stream failed', error);
			if (!response.headersSent) {
				respondWithResult(response, {
					statusCode: 500,
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
						'Access-Control-Allow-Headers': 'Content-Type',
					},
					body: { error: 'request_stream_error' },
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

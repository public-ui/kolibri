import { createServer } from 'node:http';
import { handleApiRequest } from './api-handler.js';
import { buildSampleIndex } from './sample-index.js';

const DEFAULT_PORT = Number.parseInt(process.env.PORT ?? '3030', 10);

export async function startServer(options = {}) {
        const port = Number.parseInt(`${options.port ?? DEFAULT_PORT}`, 10);
        let index = await buildSampleIndex();

        const server = createServer((request, response) => {
                Promise.resolve(
                        handleApiRequest({
                                method: request.method ?? 'GET',
                                url: request.url ?? '/',
                                headers: request.headers ?? {},
                                getIndex: () => index,
                        }),
                )
                        .then((result) => respondWithResult(response, result))
                        .catch((error) => {
                                console.error('[mcp] request failed', error);
                                if (!response.headersSent) {
                                        return respondWithResult(response, {
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

	return server;
}

async function respondWithResult(response, result) {
        if (response.headersSent) {
                return;
        }

        const headers = { ...result.headers };
        if (!result.stream) {
                headers['Content-Type'] = headers['Content-Type'] ?? 'application/json; charset=utf-8';
        }

        for (const [name, value] of Object.entries(headers)) {
                response.setHeader(name, value);
        }

        response.statusCode = result.statusCode;

        if (result.stream) {
                try {
                        for await (const chunk of result.stream) {
                                if (response.writableEnded) {
                                        break;
                                }
                                response.write(chunk);
                        }
                } catch (streamError) {
                        console.error('[mcp] failed to stream response', streamError);
                        if (!response.headersSent) {
                                response.statusCode = 500;
                                response.setHeader('Content-Type', 'application/json; charset=utf-8');
                                response.end(JSON.stringify({ error: 'stream_error' }));
                                return;
                        }
                }

                if (!response.writableEnded) {
                        response.end();
                }
                return;
        }

        if (result.body === undefined) {
                response.end();
                return;
        }

        response.end(JSON.stringify(result.body, null, 2));
}

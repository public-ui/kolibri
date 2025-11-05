import { createServer } from 'node:http';
import { handleApiRequest } from './http-handler.js';
import type { SampleIndexLike } from './mcp-content.js';
import { buildSampleIndex } from './sample-index.js';

const DEFAULT_PORT = Number.parseInt(process.env.PORT ?? '3030', 10);

export interface StartServerOptions {
	port?: number;
}

export async function startServer(options: StartServerOptions = {}) {
	const port = Number.parseInt(`${options.port ?? DEFAULT_PORT}`, 10);
	let cachedIndex: SampleIndexLike | null = null;
	let indexPromise: Promise<SampleIndexLike> | null = null;

	const getIndex = async () => {
		if (cachedIndex) {
			return cachedIndex;
		}

		if (!indexPromise) {
			indexPromise = buildSampleIndex()
				.then((index) => {
					cachedIndex = index;
					return index;
				})
				.catch((error) => {
					indexPromise = null;
					throw error;
				});
		}

		return indexPromise;
	};

	const server = createServer((req, res) => {
		void handleApiRequest(req, res, { getIndex });
	});

	server.listen(port, () => {
		console.log(`[mcp] server listening on http://localhost:${port}/mcp`);
	});

	return server;
}

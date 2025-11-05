import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { readFile } from 'node:fs/promises';
import { IncomingMessage, ServerResponse } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SampleIndexLike } from './mcp-content.js';
import { createKolibriMcpServer } from './mcp-server.js';
import { buildSampleIndex } from './sample-index.js';

const __dirname = path.dirname(fileURLToPath(new URL(import.meta.url)));
const PUBLIC_DIR = path.resolve(__dirname, '../public');

let cachedIndex: SampleIndexLike | null = null;
let cachedIndexPromise: Promise<SampleIndexLike> | null = null;
let cachedLandingPage: string | null = null;
let cachedFavicon: Buffer | null = null;

async function getIndex(): Promise<SampleIndexLike> {
	if (cachedIndex) {
		return cachedIndex;
	}

	if (!cachedIndexPromise) {
		cachedIndexPromise = buildSampleIndex()
			.then((index) => {
				cachedIndex = index;
				return index;
			})
			.catch((error) => {
				cachedIndexPromise = null;
				throw error;
			});
	}

	return cachedIndexPromise;
}

function setCorsHeaders(res: ServerResponse) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, mcp-session-id');
	res.setHeader('Access-Control-Expose-Headers', 'Mcp-Session-Id');
}

async function serveLandingPage(res: ServerResponse) {
	try {
		if (!cachedLandingPage) {
			const htmlPath = path.join(PUBLIC_DIR, 'index.html');
			cachedLandingPage = await readFile(htmlPath, 'utf8');
		}
		res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
		res.end(cachedLandingPage);
	} catch (error) {
		console.error('[mcp] failed to serve landing page', error);
		res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
		res.end('KoliBri MCP server is running without a landing page.');
	}
}

async function serveFavicon(res: ServerResponse) {
	try {
		if (!cachedFavicon) {
			const faviconPath = path.join(PUBLIC_DIR, 'kolibri-favicon.svg');
			cachedFavicon = await readFile(faviconPath);
		}
		res.writeHead(200, { 'Content-Type': 'image/svg+xml; charset=utf-8' });
		res.end(cachedFavicon);
	} catch (error) {
		console.error('[mcp] failed to serve favicon', error);
		res.writeHead(404).end();
	}
}

function resolveTransportMode(pathname: string) {
	const normalized = pathname.replace(/\/+$/, '') || '/';

	if (normalized === '/mcp' || normalized === '/api/mcp') {
		return { enableJsonResponse: false } as const;
	}

	if (normalized === '/http' || normalized === '/api/http') {
		return { enableJsonResponse: true } as const;
	}

	if (normalized === '/sse' || normalized === '/api/sse') {
		return { enableJsonResponse: false } as const;
	}

	return null;
}

async function readRequestBody(req: IncomingMessage): Promise<string> {
	const chunks: Buffer[] = [];
	for await (const chunk of req) {
		if (typeof chunk === 'string') {
			chunks.push(Buffer.from(chunk));
		} else {
			chunks.push(chunk);
		}
	}
	return Buffer.concat(chunks).toString('utf8');
}

export interface HandleApiRequestOptions {
	getIndex?: () => Promise<SampleIndexLike>;
}

export async function handleApiRequest(req: IncomingMessage, res: ServerResponse, options: HandleApiRequestOptions = {}): Promise<void> {
	let server: ReturnType<typeof createKolibriMcpServer> | null = null;
	try {
		if (!req.url) {
			res.writeHead(400, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ error: 'bad_request', message: 'Missing request URL' }));
			return;
		}

		const requestUrl = new URL(req.url, `http://${req.headers.host ?? 'localhost'}`);
		const pathname = requestUrl.pathname;

		if (req.method === 'GET' && pathname === '/') {
			await serveLandingPage(res);
			return;
		}

		if (req.method === 'GET' && pathname === '/kolibri-favicon.svg') {
			await serveFavicon(res);
			return;
		}

		if (req.method === 'OPTIONS') {
			setCorsHeaders(res);
			res.writeHead(204).end();
			return;
		}

		const transportMode = resolveTransportMode(pathname);
		if (!transportMode) {
			res.writeHead(404, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ error: 'not_found', path: pathname }));
			return;
		}

		let parsedBody: unknown;
		if (req.method === 'POST') {
			const rawBody = await readRequestBody(req);
			if (rawBody.trim()) {
				try {
					parsedBody = JSON.parse(rawBody);
				} catch (error) {
					res.writeHead(400, { 'Content-Type': 'application/json' });
					res.end(JSON.stringify({ error: 'invalid_json', message: 'Request body is not valid JSON.' }));
					return;
				}
			}
		}

		const indexProvider = options.getIndex ?? getIndex;
		const index = await indexProvider();
		server = createKolibriMcpServer({ index });
		const transport = new StreamableHTTPServerTransport({
			sessionIdGenerator: undefined,
			enableJsonResponse: transportMode.enableJsonResponse,
		});

		setCorsHeaders(res);

		await server.connect(transport);
		await transport.handleRequest(req, res, parsedBody);
	} catch (error) {
		console.error('[mcp] request failed', error);
		if (!res.headersSent) {
			res.writeHead(500, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ error: 'internal_error', message: 'Unexpected MCP server failure.' }));
		}
	} finally {
		if (server?.isConnected()) {
			await server.close().catch((closeError) => {
				if (closeError) {
					console.error('[mcp] failed to close server', closeError);
				}
			});
		}
	}
}

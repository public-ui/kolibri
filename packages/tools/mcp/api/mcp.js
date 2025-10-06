import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { handleApiRequest } from '../src/api-handler.js';
import { buildDynamicSampleIndex, createSampleIndexFromData } from '../src/prebuilt/sample-index-utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DEFAULT_INDEX_CANDIDATES = [process.env.KOLIBRI_MCP_INDEX_PATH, path.join(__dirname, '../vercel/sample-index.json')];

let cachedIndex;
let currentStrategy = 'prebuilt';
let lastSource;

function getCandidatePaths() {
	const candidates = new Set();
	for (const candidate of DEFAULT_INDEX_CANDIDATES) {
		if (candidate) {
			candidates.add(candidate);
		}
	}
	return Array.from(candidates);
}

async function loadIndexFromFile(filePath) {
	try {
		const content = await readFile(filePath, 'utf8');
		const data = JSON.parse(content);
		const index = createSampleIndexFromData(data);
		lastSource = filePath;
		currentStrategy = 'prebuilt';
		return index;
	} catch (error) {
		if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
			return undefined;
		}
		throw error;
	}
}

async function loadPrebuiltIndex() {
	const candidates = getCandidatePaths();
	for (const candidate of candidates) {
		try {
			const index = await loadIndexFromFile(candidate);
			if (index) {
				console.log(`[mcp] loaded sample index from ${candidate}`);
				return index;
			}
		} catch (error) {
			console.warn(`[mcp] failed to load prebuilt index from ${candidate}:`, error);
		}
	}
	return undefined;
}

async function ensureIndex() {
	if (cachedIndex) {
		return cachedIndex;
	}

	const prebuilt = await loadPrebuiltIndex();
	if (prebuilt) {
		cachedIndex = prebuilt;
		return cachedIndex;
	}

	console.warn('[mcp] no prebuilt index found – generating on demand');
	cachedIndex = await buildDynamicSampleIndex();
	currentStrategy = 'dynamic';
	lastSource = 'dynamic-build';
	return cachedIndex;
}

async function refreshIndex() {
	if (currentStrategy === 'dynamic') {
		cachedIndex = await buildDynamicSampleIndex();
		return cachedIndex;
	}

	cachedIndex = undefined;
	return ensureIndex();
}

function buildRequestUrl(request) {
	const rawHost = request.headers?.host ?? 'vercel.local';
	const forwardedProto = request.headers?.['x-forwarded-proto'];
	const protocol = typeof forwardedProto === 'string' ? forwardedProto.split(',')[0] : rawHost.includes('localhost') ? 'http' : 'https';
	const baseUrl = `${protocol}://${rawHost}`;
	const requestUrl = request.url ?? '/';
	return new URL(requestUrl, baseUrl).toString();
}

function setCorsHeaders(response) {
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
	response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function sendResponse(response, result) {
	setCorsHeaders(response);
	const headers = {
		'Content-Type': 'application/json; charset=utf-8',
		...result.headers,
	};
	for (const [name, value] of Object.entries(headers)) {
		if (value !== undefined) {
			response.setHeader(name, value);
		}
	}
	response.statusCode = result.statusCode;
	response.end(result.body === undefined ? '' : JSON.stringify(result.body));
}

function sendError(response, error) {
	console.error('[mcp] vercel handler failed', error);
	setCorsHeaders(response);
	response.statusCode = 500;
	response.setHeader('Content-Type', 'application/json; charset=utf-8');
	response.end(
		JSON.stringify({
			error: 'internal_error',
			message: error instanceof Error ? error.message : 'unknown_error',
			timestamp: new Date().toISOString(),
			strategy: currentStrategy,
			source: lastSource,
		}),
	);
}

function handleOptions(response) {
	setCorsHeaders(response);
	response.statusCode = 204;
	response.end();
}

export default async function handler(request, response) {
	if ((request.method ?? 'GET').toUpperCase() === 'OPTIONS') {
		handleOptions(response);
		return;
	}

	try {
		const result = await handleApiRequest({
			method: request.method ?? 'GET',
			url: buildRequestUrl(request),
			headers: request.headers || {},
			getIndex: () => ensureIndex(),
			refresh: () => refreshIndex(),
		});
		sendResponse(response, result);
	} catch (error) {
		sendError(response, error);
	}
}

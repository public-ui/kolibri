import { readFileSync } from 'node:fs';
import { handleApiRequest } from '../api-handler.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let prebuiltIndex;

async function getIndex() {
	if (!prebuiltIndex) {
		try {
			// Try to load from functions directory first (Netlify deployment)
			let indexPath = path.join(__dirname, './sample-index.json');
			let indexData;

			try {
				indexData = JSON.parse(readFileSync(indexPath, 'utf8'));
			} catch (error) {
				// Fallback to local development path
				indexPath = path.join(__dirname, '../../netlify/sample-index.json');
				indexData = JSON.parse(readFileSync(indexPath, 'utf8'));
			}

			// Recreate the SampleIndex-like object
			prebuiltIndex = {
				entries: indexData.entries,
				generatedAt: new Date(indexData.generatedAt),
				map: new Map(indexData.entries.map((entry) => [entry.id, entry])),
				list(query) {
					if (!query) {
						return this.entries;
					}
					const normalized = query.trim().toLowerCase();
					return this.entries.filter(
						(entry) =>
							entry.id.toLowerCase().includes(normalized) || entry.group.toLowerCase().includes(normalized) || entry.name.toLowerCase().includes(normalized),
					);
				},
				get(id) {
					return this.map.get(id);
				},
			};
		} catch (error) {
			console.error('Failed to load prebuilt index:', error);
			// Fallback empty index
			prebuiltIndex = {
				entries: [],
				generatedAt: new Date(),
				map: new Map(),
				list: () => [],
				get: () => undefined,
			};
		}
	}
	return prebuiltIndex;
}

async function refreshIndex() {
	// In Netlify, we can't rebuild dynamically, so just return current index
	console.log('Refresh requested, but using prebuilt index in Netlify environment');
	return getIndex();
}

function buildRequestUrl(event) {
	if (event.rawUrl) {
		return event.rawUrl;
	}

	const path = event.path ?? '/';
	const queryParams = event.queryStringParameters || {};
	const query = Object.keys(queryParams).length > 0 ? '?' + new URLSearchParams(queryParams).toString() : '';

	return `https://netlify.local${path}${query}`;
}

export async function handler(event) {
	try {
		const result = await handleApiRequest({
			method: event.httpMethod ?? 'GET',
			url: buildRequestUrl(event),
			getIndex,
			refresh: refreshIndex,
		});
		return {
			statusCode: result.statusCode,
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				...result.headers,
			},
			body: result.body === undefined ? '' : JSON.stringify(result.body),
			isBase64Encoded: false,
		};
	} catch (error) {
		console.error('[mcp] netlify handler failed', error);
		return {
			statusCode: 500,
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type',
			},
			body: JSON.stringify({
				error: 'internal_error',
				message: error.message,
				timestamp: new Date().toISOString(),
			}),
			isBase64Encoded: false,
		};
	}
}

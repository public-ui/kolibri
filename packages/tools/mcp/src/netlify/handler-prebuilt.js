import { handleApiRequest } from '../api-handler.js';
import { SAMPLE_INDEX_DATA } from './sample-index-data.js';

let prebuiltIndex;

async function getIndex() {
	if (!prebuiltIndex) {
		try {
			// Use embedded data directly
			const indexData = SAMPLE_INDEX_DATA; // Recreate the SampleIndex-like object
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

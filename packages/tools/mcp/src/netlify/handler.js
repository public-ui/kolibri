import { buildSampleIndex } from '../sample-index.js';
import { handleApiRequest } from '../api-handler.js';

let indexPromise;

async function getIndex() {
	if (!indexPromise) {
		indexPromise = buildSampleIndex();
	}
	return indexPromise;
}

async function refreshIndex() {
	indexPromise = buildSampleIndex();
	return indexPromise;
}

function buildRequestUrl(event) {
	if (event.rawUrl) {
		return event.rawUrl;
	}

	const query = event.rawQuery ? `?${event.rawQuery}` : '';
	return `https://netlify.local${event.path ?? '/'}${query}`;
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
			body: JSON.stringify({ error: 'internal_error' }),
			isBase64Encoded: false,
		};
	}
}

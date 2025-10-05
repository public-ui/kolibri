import { handleApiRequest } from '../api-handler.js';
import { getCandidateIndexPaths, getCurrentIndexSource, loadPrebuiltIndex, refreshPrebuiltIndex } from './prebuilt-index.js';

function buildRequestUrl(event) {
	if (event.rawUrl) {
		return event.rawUrl;
	}

	const path = event.path ?? '/';
	const queryParams = event.queryStringParameters || {};
	const query = Object.keys(queryParams).length > 0 ? `?${new URLSearchParams(queryParams).toString()}` : '';

	return `https://netlify.local${path}${query}`;
}

export async function handler(event, _context = {}) {
	console.log('[mcp] debug handler invoked', {
		path: event.path,
		httpMethod: event.httpMethod,
		queryStringParameters: event.queryStringParameters,
		rawUrl: event.rawUrl,
		indexSource: getCurrentIndexSource(),
		candidatePaths: getCandidateIndexPaths(),
	});

	try {
		const result = await handleApiRequest({
			method: event.httpMethod ?? 'GET',
			url: buildRequestUrl(event),
			getIndex: loadPrebuiltIndex,
			refresh: refreshPrebuiltIndex,
		});

		console.log('[mcp] debug handler result', result);

		return {
			statusCode: result.statusCode,
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				...result.headers,
			},
			body: result.body === undefined ? '' : JSON.stringify(result.body, null, 2),
			isBase64Encoded: false,
		};
	} catch (error) {
		console.error('[mcp] debug netlify handler failed', error);
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
				message: error instanceof Error ? error.message : 'unknown_error',
				stack: error instanceof Error ? error.stack : undefined,
				timestamp: new Date().toISOString(),
			}),
			isBase64Encoded: false,
		};
	}
}

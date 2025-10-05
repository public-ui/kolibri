// Netlify TypeScript Function - official pattern
// https://docs.netlify.com/build/functions/get-started/?data-tab=TypeScript

import type { Context } from '@netlify/functions';

export default async (req: Request, context: Context) => {
	console.log('🚀 MCP TypeScript Function called');
	console.log('Method:', req.method);
	console.log('URL:', req.url);

	// Simple routing based on URL path
	const url = new URL(req.url);
	const path = url.pathname;

	// CORS headers
	const headers = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type',
		'Content-Type': 'application/json',
	};

	// Handle CORS preflight
	if (req.method === 'OPTIONS') {
		return new Response('', { status: 200, headers });
	}

	// Simple response data
	const responseData = {
		message: 'KoliBri MCP TypeScript Function',
		timestamp: new Date().toISOString(),
		path: path,
		method: req.method,
		status: 'working',
		samples: [
			{ id: 'button/basic', name: 'Basic Button' },
			{ id: 'input/text', name: 'Text Input' },
			{ id: 'card/basic', name: 'Basic Card' },
		],
	};

	return new Response(JSON.stringify(responseData, null, 2), {
		status: 200,
		headers,
	});
};

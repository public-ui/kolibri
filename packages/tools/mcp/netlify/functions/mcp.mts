import type { Config, Context } from '@netlify/functions';

// Sample data for testing
const SAMPLE_DATA = [
	{
		id: 'button/basic',
		group: 'button',
		name: 'basic',
		path: 'packages/samples/react/src/components/button/basic.tsx',
		code: "import React from 'react';\nimport { KolButton } from '@public-ui/react';\n\nexport const ButtonBasic = () => (\n  <KolButton _label=\"Click me\" />\n);",
	},
	{
		id: 'input/text',
		group: 'input',
		name: 'text',
		path: 'packages/samples/react/src/components/input/text.tsx',
		code: "import React from 'react';\nimport { KolInputText } from '@public-ui/react';\n\nexport const InputText = () => (\n  <KolInputText _label=\"Enter text\" />\n);",
	},
	{
		id: 'accordion/basic',
		group: 'accordion',
		name: 'basic',
		path: 'packages/samples/react/src/components/accordion/basic.tsx',
		code: "import React from 'react';\nimport { KolAccordion } from '@public-ui/react';\n\nexport const AccordionBasic = () => (\n  <KolAccordion _label=\"Click to expand\">Content here</KolAccordion>\n);",
	},
];

export default async (req: Request, context: Context) => {
	console.log('🚀 MCP TypeScript Function called');
	console.log('Method:', req.method);
	console.log('URL:', req.url);

	const url = new URL(req.url);
	const path = url.pathname;

	console.log('Processing path:', path);

	// CORS headers
	const corsHeaders = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type',
		'Content-Type': 'application/json',
	};

	// Handle CORS preflight
	if (req.method === 'OPTIONS') {
		console.log('Handling CORS preflight');
		return new Response('', {
			status: 200,
			headers: corsHeaders,
		});
	}

	try {
		let responseData: any;

		if (path.includes('/health') || path === '/') {
			console.log('Health check requested');
			responseData = {
				status: 'ok',
				message: 'KoliBri MCP service is running',
				timestamp: new Date().toISOString(),
				version: '2.0.0',
				totalSamples: SAMPLE_DATA.length,
				path: path,
				technology: 'Netlify Functions + TypeScript',
			};
		} else if (path.includes('/samples')) {
			console.log('Samples list requested');
			const searchQuery = url.searchParams.get('q')?.toLowerCase() || '';

			let filteredSamples = SAMPLE_DATA;
			if (searchQuery) {
				filteredSamples = SAMPLE_DATA.filter(
					(sample) =>
						sample.id.toLowerCase().includes(searchQuery) ||
						sample.group.toLowerCase().includes(searchQuery) ||
						sample.name.toLowerCase().includes(searchQuery),
				);
			}

			responseData = {
				items: filteredSamples.map((sample) => ({
					id: sample.id,
					group: sample.group,
					name: sample.name,
					path: sample.path,
				})),
				total: filteredSamples.length,
				query: searchQuery,
				generatedAt: new Date().toISOString(),
			};
		} else if (path.includes('/sample')) {
			console.log('Single sample requested');
			const sampleId = url.searchParams.get('id');

			if (!sampleId) {
				return new Response(
					JSON.stringify({
						error: 'Missing sample ID',
						message: 'Please provide an ID parameter',
					}),
					{
						status: 400,
						headers: corsHeaders,
					},
				);
			}

			const sample = SAMPLE_DATA.find((s) => s.id === sampleId);
			if (!sample) {
				return new Response(
					JSON.stringify({
						error: 'Sample not found',
						id: sampleId,
						availableIds: SAMPLE_DATA.map((s) => s.id),
					}),
					{
						status: 404,
						headers: corsHeaders,
					},
				);
			}

			responseData = sample;
		} else if (path.includes('/refresh')) {
			console.log('Refresh requested');
			responseData = {
				message: 'Refresh completed',
				timestamp: new Date().toISOString(),
				samplesReloaded: SAMPLE_DATA.length,
			};
		} else {
			console.log('API root requested');
			responseData = {
				message: 'KoliBri Model Context Protocol API',
				description: 'Provides access to KoliBri component samples for AI agents',
				endpoints: [
					{ path: '/health', description: 'Service health check' },
					{ path: '/samples', description: 'List all samples', query: '?q=<search>' },
					{ path: '/sample', description: 'Get sample by ID', query: '?id=<sample-id>' },
					{ path: '/refresh', description: 'Refresh sample cache' },
				],
				timestamp: new Date().toISOString(),
				path: path,
			};
		}

		console.log('✅ Sending response:', responseData);

		return new Response(JSON.stringify(responseData), {
			status: 200,
			headers: corsHeaders,
		});
	} catch (error) {
		console.error('❌ Function error:', error);

		return new Response(
			JSON.stringify({
				error: 'Internal server error',
				message: error instanceof Error ? error.message : 'Unknown error',
				timestamp: new Date().toISOString(),
			}),
			{
				status: 500,
				headers: corsHeaders,
			},
		);
	}
};

// Configure routing to handle all paths
export const config: Config = {
	path: ['/health', '/samples', '/sample', '/refresh', '/'],
};

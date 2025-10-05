// Simple MCP function for Netlify
exports.handler = async function (event, context) {
	console.log('🚀 MCP Handler called');
	console.log(
		'Event:',
		JSON.stringify(
			{
				httpMethod: event.httpMethod,
				path: event.path,
				queryStringParameters: event.queryStringParameters,
			},
			null,
			2,
		),
	);

	try {
		// Extract path from event
		const path = event.path || '/';
		console.log('Processing path:', path);

		const corsHeaders = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
		};

		// Handle CORS preflight
		if (event.httpMethod === 'OPTIONS') {
			console.log('Handling CORS preflight');
			return {
				statusCode: 200,
				headers: corsHeaders,
				body: '',
			};
		}

		let responseBody;

		// Route based on path
		if (path.includes('/health') || path === '/') {
			console.log('Health check requested');
			responseBody = {
				status: 'ok',
				message: 'MCP service is running',
				timestamp: new Date().toISOString(),
				version: '1.0.0',
				path: path,
			};
		} else if (path.includes('/samples')) {
			console.log('Samples requested');
			responseBody = {
				items: [
					{
						id: 'test/basic',
						group: 'test',
						name: 'basic',
						path: 'test/basic.tsx',
					},
					{
						id: 'button/basic',
						group: 'button',
						name: 'basic',
						path: 'components/button/basic.tsx',
					},
				],
				total: 2,
				query: event.queryStringParameters?.q || '',
				generatedAt: new Date().toISOString(),
			};
		} else if (path.includes('/sample')) {
			console.log('Single sample requested');
			const id = event.queryStringParameters?.id;
			if (id === 'test/basic') {
				responseBody = {
					id: 'test/basic',
					group: 'test',
					name: 'basic',
					path: 'test/basic.tsx',
					code: '// Test component\nexport const Test = () => <div>Test</div>;',
				};
			} else {
				console.log('Sample not found:', id);
				return {
					statusCode: 404,
					headers: { ...corsHeaders, 'Content-Type': 'application/json' },
					body: JSON.stringify({ error: 'Sample not found', id }),
				};
			}
		} else {
			console.log('API root requested');
			responseBody = {
				message: 'KoliBri MCP API',
				endpoints: ['/health', '/samples', '/sample?id=<id>'],
				timestamp: new Date().toISOString(),
				path: path,
			};
		}

		console.log('Sending response:', responseBody);

		return {
			statusCode: 200,
			headers: {
				...corsHeaders,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(responseBody),
		};
	} catch (error) {
		console.error('❌ Handler error:', error);

		return {
			statusCode: 500,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				error: 'Internal server error',
				message: error.message,
				timestamp: new Date().toISOString(),
			}),
		};
	}
};

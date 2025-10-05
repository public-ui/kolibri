exports.handler = async function (event, context) {
	console.log('Simple MCP Handler called');
	console.log('Event:', JSON.stringify(event, null, 2));

	try {
		// Simple routing based on path
		const path = event.path || '/';

		const corsHeaders = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
		};

		// Handle CORS preflight
		if (event.httpMethod === 'OPTIONS') {
			return {
				statusCode: 200,
				headers: corsHeaders,
				body: '',
			};
		}

		let responseBody;

		if (path.includes('/health')) {
			responseBody = {
				status: 'ok',
				message: 'MCP service is running',
				timestamp: new Date().toISOString(),
				version: '1.0.0',
			};
		} else if (path.includes('/samples')) {
			responseBody = {
				items: [
					{
						id: 'test/basic',
						group: 'test',
						name: 'basic',
						path: 'test/basic.tsx',
					},
				],
				total: 1,
				query: event.queryStringParameters?.q || '',
				generatedAt: new Date().toISOString(),
			};
		} else if (path.includes('/sample')) {
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
				return {
					statusCode: 404,
					headers: { ...corsHeaders, 'Content-Type': 'application/json' },
					body: JSON.stringify({ error: 'Sample not found', id }),
				};
			}
		} else {
			responseBody = {
				message: 'MCP API',
				endpoints: ['/health', '/samples', '/sample?id=<id>'],
				timestamp: new Date().toISOString(),
			};
		}

		return {
			statusCode: 200,
			headers: {
				...corsHeaders,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(responseBody),
		};
	} catch (error) {
		console.error('Handler error:', error);

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

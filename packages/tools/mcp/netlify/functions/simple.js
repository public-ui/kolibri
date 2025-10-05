exports.handler = async (event, context) => {
	console.log('🚀 Super simple function called');

	return {
		statusCode: 200,
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify({
			message: 'Hello from simple Netlify Function!',
			timestamp: new Date().toISOString(),
			event: event.httpMethod,
			path: event.path,
			success: true,
		}),
	};
};

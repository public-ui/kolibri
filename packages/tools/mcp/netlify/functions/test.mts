export default async (req: Request) => {
	console.log('🚀 Simple test function called');

	return new Response(
		JSON.stringify({
			message: 'Hello from Netlify TypeScript Function!',
			timestamp: new Date().toISOString(),
			method: req.method,
			url: req.url,
			success: true,
		}),
		{
			status: 200,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		},
	);
};

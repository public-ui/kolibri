#!/usr/bin/env node
import { credentials, loadPackageDefinition } from '@grpc/grpc-js';
import { load } from '@grpc/proto-loader';
import { createHydrateServer, hydrateProtoPath } from './dist/index.mjs';

async function interactiveGrpcTest() {
	console.log('🧪 Interactive gRPC Test Suite\n');

	const server = await createHydrateServer({
		grpcHost: '127.0.0.1',
		grpcPort: 0,
		logger: false,
	});

	await server.start();
	const grpcEndpoint = server.getGrpcEndpoint();
	console.log(`📡 Server: ${grpcEndpoint}\n`);

	// Load proto and create client
	const packageDefinition = await load(hydrateProtoPath, {
		keepCase: false,
		longs: String,
		enums: String,
		defaults: true,
		oneofs: true,
	});

	const proto = loadPackageDefinition(packageDefinition);
	const client = new proto.publicui.hydrate.HydrateRenderer(grpcEndpoint, credentials.createInsecure());

	// Test cases
	const testCases = [
		{
			name: 'Button',
			html: '<kol-button _label="Click me"></kol-button>',
		},
		{
			name: 'Badge',
			html: '<kol-badge _label="New"></kol-badge>',
		},
		{
			name: 'Alert',
			html: '<kol-alert _type="info" _heading="Info">This is an info message.</kol-alert>',
		},
		{
			name: 'Multiple Components',
			html: '<kol-card><kol-heading>Card Title</kol-heading><kol-button _label="Action"></kol-button></kol-card>',
		},
	];

	try {
		for (const testCase of testCases) {
			console.log(`🔍 Testing ${testCase.name}:`);
			console.log(`   Input: ${testCase.html}`);

			const start = Date.now();
			const response = await new Promise((resolve, reject) => {
				client.renderHtml({ html: testCase.html }, (error, response) => {
					if (error) reject(error);
					else resolve(response);
				});
			});
			const duration = Date.now() - start;

			console.log(`   ⚡ Duration: ${duration}ms`);
			console.log(`   📏 Output size: ${response.html.length} chars`);
			console.log(`   🔧 Hydrated: ${response.hydratedCount} components`);
			console.log(`   📋 Diagnostics: ${JSON.parse(response.diagnosticsJson || '[]').length} items\n`);
		}

		console.log('✅ All tests completed successfully!');
	} catch (error) {
		console.error('❌ Test failed:', error.message);
	} finally {
		client.close();
		await server.stop();
		console.log('🛑 Server stopped');
	}
}

interactiveGrpcTest().catch(console.error);

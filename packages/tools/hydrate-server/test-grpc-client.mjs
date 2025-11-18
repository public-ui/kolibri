#!/usr/bin/env node
import { credentials, loadPackageDefinition } from '@grpc/grpc-js';
import { load } from '@grpc/proto-loader';
import { createHydrateServer, hydrateProtoPath } from './dist/index.mjs';

async function testGrpcClient() {
	console.log('🚀 Starting gRPC client test...\n');

	// Start server
	const server = await createHydrateServer({
		restHost: '127.0.0.1',
		restPort: 0,
		grpcHost: '127.0.0.1',
		grpcPort: 0,
		logger: false,
	});

	await server.start();
	const grpcEndpoint = server.getGrpcEndpoint();
	console.log(`📡 gRPC Server running at: ${grpcEndpoint}`);

	try {
		// Load proto definition
		const packageDefinition = await load(hydrateProtoPath, {
			keepCase: false,
			longs: String,
			enums: String,
			defaults: true,
			oneofs: true,
		});

		const proto = loadPackageDefinition(packageDefinition);
		const hydratePackage = proto.publicui?.hydrate;

		// Create client
		const client = new hydratePackage.HydrateRenderer(grpcEndpoint, credentials.createInsecure());

		console.log('✅ gRPC Client connected\n');

		// Test simple component
		const testHtml = '<kol-button _label="Test Button"></kol-button>';

		console.log('📤 Sending request:', testHtml);

		const startTime = Date.now();

		const response = await new Promise((resolve, reject) => {
			client.renderHtml({ html: testHtml }, (error, response) => {
				if (error) {
					reject(error);
					return;
				}
				resolve(response);
			});
		});

		const duration = Date.now() - startTime;

		console.log(`📥 Response received in ${duration}ms:`);
		console.log('  HTML length:', response.html.length);
		console.log('  Components:', response.components);
		console.log('  Hydrated count:', response.hydratedCount);
		console.log('  HTML preview:', response.html.substring(0, 200) + '...');

		// Parse diagnostics
		const diagnostics = JSON.parse(response.diagnosticsJson || '[]');
		console.log('  Diagnostics:', diagnostics.length, 'items');

		// Clean up
		client.close();
		console.log('\n✅ gRPC test completed successfully!');
	} catch (error) {
		console.error('❌ gRPC test failed:', error.message);
	} finally {
		await server.stop();
		console.log('🛑 Server stopped');
	}
}

// Run test
testGrpcClient().catch(console.error);

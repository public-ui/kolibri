import assert from 'node:assert/strict';
import { test } from 'node:test';

import { credentials, loadPackageDefinition } from '@grpc/grpc-js';
import { load } from '@grpc/proto-loader';

import { createHydrateServer, hydrateProtoPath } from '../../dist/index.mjs';

const stubRenderer = async (html) => ({
	html: `<hydrated>${html}</hydrated>`,
	components: ['kol-button'],
	hydratedCount: 1,
	diagnostics: [{ level: 'info', message: 'stub' }],
});

test('REST and gRPC endpoints return hydrated markup', async (t) => {
	const server = await createHydrateServer({
		restHost: '127.0.0.1',
		restPort: 0,
		grpcHost: '127.0.0.1',
		grpcPort: 0,
		renderer: stubRenderer,
		logger: false,
	});

	t.after(async () => {
		await server.stop();
	});

	await server.start();

	const restUrl = server.getRestUrl();
	assert.ok(restUrl, 'REST URL should be available after startup');

	const restResponse = await fetch(restUrl, {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify({ html: '<kol-button _label="Hello"></kol-button>' }),
	});

	assert.equal(restResponse.status, 200);
	const restPayload = await restResponse.json();
	assert.equal(restPayload.hydratedCount, 1);
	assert.deepEqual(restPayload.components, ['kol-button']);
	assert.ok(Array.isArray(restPayload.diagnostics));
	assert.match(restPayload.html, /<hydrated>/);

	const grpcEndpoint = server.getGrpcEndpoint();
	assert.ok(grpcEndpoint, 'gRPC endpoint should be available after startup');

	const packageDefinition = await load(hydrateProtoPath, {
		keepCase: false,
		longs: String,
		enums: String,
		defaults: true,
		oneofs: true,
	});

	const proto = loadPackageDefinition(packageDefinition);
	const hydratePackage = proto.publicui?.hydrate;
	assert.ok(hydratePackage?.HydrateRenderer, 'HydrateRenderer service should be defined');

	const client = new hydratePackage.HydrateRenderer(grpcEndpoint, credentials.createInsecure());

	const grpcResponse = await new Promise((resolve, reject) => {
		client.renderHtml({ html: '<kol-button _label="gRPC"></kol-button>' }, (error, response) => {
			if (error) {
				reject(error);
				return;
			}

			resolve(response);
		});
	});

	client.close();

	assert.ok(grpcResponse, 'gRPC response should not be null');
	assert.equal(grpcResponse.hydratedCount, 1);
	assert.deepEqual(grpcResponse.components, ['kol-button']);
	assert.match(grpcResponse.html, /<hydrated>/);

	const diagnostics = JSON.parse(grpcResponse.diagnosticsJson);
	assert.ok(Array.isArray(diagnostics));
});

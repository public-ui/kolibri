import { after, before, describe, it } from 'mocha';
import assert from 'node:assert/strict';

import { credentials, loadPackageDefinition } from '@grpc/grpc-js';
import { load } from '@grpc/proto-loader';

import { createHydrateServer, hydrateProtoPath } from '../../dist/index.mjs';
import { createSnapshotMatcher } from '../utils/snapshot.mjs';

const matchSnapshot = createSnapshotMatcher(import.meta.url);

const stubRenderer = async (html) => ({
	html: `<kol-snapshot>${html}</kol-snapshot>`,
	components: ['kol-button'],
	hydratedCount: 1,
	diagnostics: [
		{
			level: 'info',
			message: 'stub-renderer',
		},
	],
});

describe('hydrate server API', () => {
	let server;
	let restUrl;
	let grpcEndpoint;
	let HydrateRenderer;

	before(async () => {
		server = await createHydrateServer({
			restHost: '127.0.0.1',
			restPort: 0,
			grpcHost: '127.0.0.1',
			grpcPort: 0,
			renderer: stubRenderer,
			logger: false,
		});

		await server.start();

		restUrl = server.getRestUrl();
		grpcEndpoint = server.getGrpcEndpoint();

		assert.ok(restUrl, 'REST URL should be available');
		assert.ok(grpcEndpoint, 'gRPC endpoint should be available');

		const packageDefinition = await load(hydrateProtoPath, {
			keepCase: false,
			longs: String,
			enums: String,
			defaults: true,
			oneofs: true,
		});

		const proto = loadPackageDefinition(packageDefinition);
		HydrateRenderer = proto.publicui?.hydrate?.HydrateRenderer;

		assert.ok(HydrateRenderer, 'HydrateRenderer service should be defined');
	});

	after(async () => {
		if (server) {
			await server.stop();
		}
	});

	it('returns hydrated markup via REST', async () => {
		const response = await fetch(restUrl, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				html: '<kol-button _label="Snapshot REST"></kol-button>',
			}),
		});

		assert.equal(response.status, 200);

		const payload = await response.json();
		assert.equal(payload.hydratedCount, 1);
		assert.deepEqual(payload.components, ['kol-button']);
		assert.ok(payload.html.includes('<kol-snapshot>'));

		await matchSnapshot('rest-basic-hydration', payload);
	});

	it('returns hydrated markup via gRPC', async () => {
		const client = new HydrateRenderer(grpcEndpoint, credentials.createInsecure());

		const grpcPayload = await new Promise((resolve, reject) => {
			client.renderHtml({ html: '<kol-button _label="Snapshot gRPC"></kol-button>' }, (error, response) => {
				if (error) {
					reject(error);
					return;
				}

				resolve(response);
			});
		});

		client.close();

		const normalizedPayload = {
			html: grpcPayload.html,
			components: grpcPayload.components,
			hydratedCount: grpcPayload.hydratedCount,
			diagnostics: JSON.parse(grpcPayload.diagnosticsJson),
		};

		assert.equal(normalizedPayload.hydratedCount, 1);
		assert.deepEqual(normalizedPayload.components, ['kol-button']);
		assert.ok(normalizedPayload.html.includes('<kol-snapshot>'));

		await matchSnapshot('grpc-basic-hydration', normalizedPayload);
	});
});

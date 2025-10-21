import assert from 'node:assert/strict';
import { test } from 'node:test';

import { createHydrateServer } from '../../dist/index.mjs';

test('successfully resolves @public-ui/hydrate when available', async () => {
	// In a monorepo environment, @public-ui/hydrate should be available
	// Test that createHydrateServer can successfully resolve the renderer
	const server = await createHydrateServer({
		restPort: 0, // Use random port
		grpcPort: 0, // Use random port
		logger: false,
	});

	// Should not throw and should create a server
	assert.ok(server, 'Server should be created successfully');

	// Clean up
	if (server.stop) {
		await server.stop();
	}
});

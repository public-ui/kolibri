import { after, before, describe, it } from 'mocha';
import assert from 'node:assert/strict';

import { createHydrateServer } from '../../dist/index.mjs';

/**
 * Test that external process event listeners survive hydration operations.
 * This is a regression test for the bug where clearEventListeners() would
 * remove ALL process listeners, including those from test frameworks,
 * monitoring tools, and the host application.
 */
describe('process event listeners preservation', () => {
	let server;
	let listenerCallCounts;

	// Stub renderer that simulates component hydration
	const stubRenderer = async (html) => ({
		html: `<div>${html}</div>`,
		components: ['test-component'],
		hydratedCount: 1,
		diagnostics: [],
	});

	before(async () => {
		// Track listener call counts
		listenerCallCounts = {
			uncaughtException: 0,
			unhandledRejection: 0,
			warning: 0,
			exit: 0,
		};

		// Register external process listeners (simulating host application)
		process.on('uncaughtException', () => {
			listenerCallCounts.uncaughtException++;
		});
		process.on('unhandledRejection', () => {
			listenerCallCounts.unhandledRejection++;
		});
		process.on('warning', () => {
			listenerCallCounts.warning++;
		});
		process.on('exit', () => {
			listenerCallCounts.exit++;
		});

		// Create and start hydrate server
		server = await createHydrateServer({
			restHost: '127.0.0.1',
			restPort: 0,
			grpcHost: '127.0.0.1',
			grpcPort: 0,
			renderer: stubRenderer,
			logger: false,
		});

		await server.start();
	});

	after(async () => {
		await server?.stop();

		// Clean up our test listeners
		process.removeAllListeners('uncaughtException');
		process.removeAllListeners('unhandledRejection');
		process.removeAllListeners('warning');
		process.removeAllListeners('exit');
	});

	it('should preserve process.on("uncaughtException") listeners after hydration', async () => {
		const restUrl = server.getRestUrl();
		const initialListenerCount = process.listenerCount('uncaughtException');

		assert.ok(initialListenerCount > 0, 'Should have uncaughtException listeners registered');

		// Perform multiple hydration operations
		for (let i = 0; i < 5; i++) {
			const response = await fetch(restUrl, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ html: `<test-component>${i}</test-component>` }),
			});

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`Hydration request failed: ${response.status} ${errorText}`);
			}
		}

		const finalListenerCount = process.listenerCount('uncaughtException');
		assert.strictEqual(finalListenerCount, initialListenerCount, 'uncaughtException listeners should not be removed by hydration');
	});

	it('should preserve process.on("unhandledRejection") listeners after hydration', async () => {
		const restUrl = server.getRestUrl();
		const initialListenerCount = process.listenerCount('unhandledRejection');

		assert.ok(initialListenerCount > 0, 'Should have unhandledRejection listeners registered');

		// Perform multiple hydration operations
		for (let i = 0; i < 5; i++) {
			const response = await fetch(restUrl, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ html: `<test-component>${i}</test-component>` }),
			});

			assert.ok(response.ok, 'Hydration request should succeed');
		}

		const finalListenerCount = process.listenerCount('unhandledRejection');
		assert.strictEqual(finalListenerCount, initialListenerCount, 'unhandledRejection listeners should not be removed by hydration');
	});

	it('should preserve process.on("warning") listeners after hydration', async () => {
		const restUrl = server.getRestUrl();
		const initialListenerCount = process.listenerCount('warning');

		assert.ok(initialListenerCount > 0, 'Should have warning listeners registered');

		// Perform multiple hydration operations
		for (let i = 0; i < 5; i++) {
			const response = await fetch(restUrl, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ html: `<test-component>${i}</test-component>` }),
			});

			assert.ok(response.ok, 'Hydration request should succeed');
		}

		const finalListenerCount = process.listenerCount('warning');
		assert.strictEqual(finalListenerCount, initialListenerCount, 'warning listeners should not be removed by hydration');
	});

	it('should preserve process.on("exit") listeners after hydration', async () => {
		const restUrl = server.getRestUrl();
		const initialListenerCount = process.listenerCount('exit');

		assert.ok(initialListenerCount > 0, 'Should have exit listeners registered');

		// Perform multiple hydration operations
		for (let i = 0; i < 5; i++) {
			const response = await fetch(restUrl, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ html: `<test-component>${i}</test-component>` }),
			});

			assert.ok(response.ok, 'Hydration request should succeed');
		}

		const finalListenerCount = process.listenerCount('exit');
		assert.strictEqual(finalListenerCount, initialListenerCount, 'exit listeners should not be removed by hydration');
	});

	it('should verify listeners are functional after multiple hydrations', async () => {
		const restUrl = server.getRestUrl();

		// Perform several hydration operations
		for (let i = 0; i < 3; i++) {
			const response = await fetch(restUrl, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ html: `<test-component>test-${i}</test-component>` }),
			});

			assert.ok(response.ok, 'Hydration request should succeed');
		}

		// Verify that we can still emit events and they are received
		const testWarning = new Error('Test warning - can be ignored');
		testWarning.name = 'HydrationTestWarning';

		const warningListenerCount = process.listenerCount('warning');
		process.emit('warning', testWarning);

		// Wait a tick for event to be processed
		await new Promise((resolve) => setImmediate(resolve));

		// Verify listener count hasn't changed
		assert.strictEqual(process.listenerCount('warning'), warningListenerCount, 'Warning listener should still be registered after emission');
	});
});

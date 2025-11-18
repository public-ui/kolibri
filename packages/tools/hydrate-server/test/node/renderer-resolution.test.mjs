import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { test } from 'node:test';

import { createHydrateServer } from '../../dist/index.mjs';

const require = createRequire(import.meta.url);

const canResolveHydrateRenderer = async () => {
	const attempts = [async () => await import('@public-ui/hydrate'), async () => require('@public-ui/hydrate')];

	for (const attempt of attempts) {
		try {
			const module = await attempt();
			const renderer =
				typeof module.renderToString === 'function'
					? module.renderToString
					: typeof module.default === 'function'
						? module.default
						: typeof module.default?.renderToString === 'function'
							? module.default.renderToString
							: null;

			if (renderer) {
				return { available: true };
			}
		} catch (error) {
			const code = error?.code;
			const isResolutionError = code === 'ERR_MODULE_NOT_FOUND' || code === 'MODULE_NOT_FOUND' || code === 'ERR_PACKAGE_PATH_NOT_EXPORTED';

			if (!isResolutionError) {
				throw error;
			}
		}
	}

	return { available: false };
};

const { available: hydrateAvailable } = await canResolveHydrateRenderer();

if (!hydrateAvailable) {
	console.warn('⚠️ Skipping hydrate renderer resolution test because @public-ui/hydrate is not available.');
}

test('successfully resolves @public-ui/hydrate when available', { skip: !hydrateAvailable }, async () => {
	const server = await createHydrateServer({
		restPort: 0, // Use random port
		grpcPort: 0, // Use random port
		logger: false,
	});

	assert.ok(server, 'Server should be created successfully');

	if (server.stop) {
		await server.stop();
	}
});

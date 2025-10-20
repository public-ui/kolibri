import assert from 'node:assert/strict';
import { test } from 'node:test';

import { createHydrateServer } from '../dist/index.mjs';

test('fails with a descriptive error when @public-ui/hydrate is unavailable', async () => {
	await assert.rejects(
		createHydrateServer(),
		(error) => error instanceof Error && error.message.includes('Ensure the package is installed and built before starting the hydrate server.'),
		'createHydrateServer should surface an actionable error if @public-ui/hydrate cannot be resolved',
	);
});

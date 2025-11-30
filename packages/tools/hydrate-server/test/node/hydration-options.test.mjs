import assert from 'node:assert/strict';
import { test } from 'node:test';

import { hydrateFragment } from '../../dist/index.mjs';

test('hydrateFragment applies safe defaults for each render', async () => {
	const seenOptions = [];
	const renderer = async (_html, options) => {
		seenOptions.push(options ?? {});
		return { html: '<hydrated></hydrated>' };
	};

	await hydrateFragment(renderer, '<kol-demo></kol-demo>');
	await hydrateFragment(renderer, '<kol-demo></kol-demo>');

	assert.equal(seenOptions.length, 2);
	assert.notStrictEqual(seenOptions[0], seenOptions[1], 'options object should not be reused between renders');

	for (const options of seenOptions) {
		assert.equal(options.destroyDocument, true);
		assert.equal(options.destroyWindow, true);
		assert.equal(options.serializeToHtml, true);
		assert.equal(options.clientHydrateAnnotations, false);
	}
});

test('hydrateFragment merges provided and default options without mutation', async () => {
	const observedOptions = [];
	const renderer = async (_html, options) => {
		observedOptions.push({ ...(options ?? {}) });
		if (options) {
			options.destroyWindow = 'mutated by renderer';
		}
		return { html: '<hydrated></hydrated>' };
	};

	const baseOptions = { timeout: 42, removeHtmlComments: false };
	const requestOptions = { destroyWindow: false, customFlag: true };

	await hydrateFragment(renderer, '<kol-demo></kol-demo>', requestOptions, baseOptions);
	await hydrateFragment(renderer, '<kol-demo></kol-demo>');

	assert.equal(observedOptions.length, 2);

	const [firstCall, secondCall] = observedOptions;
	assert.equal(firstCall.destroyDocument, true);
	assert.equal(firstCall.destroyWindow, false);
	assert.equal(firstCall.timeout, 42);
	assert.equal(firstCall.removeHtmlComments, false);
	assert.equal(firstCall.customFlag, true);

	assert.equal(secondCall.destroyWindow, true, 'mutations from previous call must not leak');
	assert.equal(secondCall.timeout, 5000);
});

import { describe, it } from 'mocha';
import assert from 'node:assert/strict';
import stylelint from 'stylelint';
import plugin from './no-layer-in-reuse-files.js';

const config = {
	plugins: [plugin],
	rules: { 'kolibri/common-no-layer-in-reuse-files': true },
	customSyntax: 'postcss-scss',
};

describe('kolibri/common-no-layer-in-reuse-files', () => {
	it('rejects @layer in a mixins/ partial file', async () => {
		const result = await stylelint.lint({
			code: '@layer kol-theme-component { .button { color: red; } }',
			config,
			codeFilename: '/repo/packages/themes/default/src/mixins/_button.scss',
		});
		assert.ok(result.results[0].warnings.length > 0);
		assert.ok(result.results[0].warnings[0].rule === 'kolibri/common-no-layer-in-reuse-files');
	});

	it('rejects @layer in a helpers/ file', async () => {
		const result = await stylelint.lint({
			code: '@layer kol-theme-component { .button { color: red; } }',
			config,
			codeFilename: '/repo/packages/themes/default/src/helpers/_spacing.scss',
		});
		assert.ok(result.results[0].warnings.length > 0);
	});

	it('rejects @layer in a _ prefixed partial file', async () => {
		const result = await stylelint.lint({
			code: '@layer kol-theme-component { .button { color: red; } }',
			config,
			codeFilename: '/repo/packages/themes/default/src/_variables.scss',
		});
		assert.ok(result.results[0].warnings.length > 0);
	});

	it('accepts @layer in _global.scss (exception)', async () => {
		const result = await stylelint.lint({
			code: '@layer kol-theme-global { :host { color: red; } }',
			config,
			codeFilename: '/repo/packages/themes/default/src/_global.scss',
		});
		assert.equal(result.results[0].warnings.length, 0);
	});

	it('accepts @layer in non-utility SCSS file', async () => {
		const result = await stylelint.lint({
			code: '@layer kol-theme-component { .button { color: red; } }',
			config,
			codeFilename: '/repo/packages/themes/default/src/components/button.scss',
		});
		assert.equal(result.results[0].warnings.length, 0);
	});
});

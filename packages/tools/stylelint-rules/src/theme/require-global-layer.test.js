import { describe, it } from 'mocha';
import assert from 'node:assert/strict';
import stylelint from 'stylelint';
import plugin from './require-global-layer.js';

const config = {
	plugins: [plugin],
	rules: { 'kolibri/theme-require-global-layer': true },
	customSyntax: 'postcss-scss',
};

const globalPath = '/repo/packages/themes/default/src/global.scss';
const otherPath = '/repo/packages/themes/default/src/components/button.scss';

describe('kolibri/require-global-layer', () => {
	it('accepts CSS inside @layer kol-theme-global in global.scss', async () => {
		const result = await stylelint.lint({
			code: '@layer kol-theme-global { :host { color: red; } }',
			config,
			codeFilename: globalPath,
		});
		assert.equal(result.results[0].warnings.length, 0);
	});

	it('rejects CSS outside @layer in global.scss', async () => {
		const result = await stylelint.lint({
			code: ':host { color: red; }',
			config,
			codeFilename: globalPath,
		});
		assert.ok(result.results[0].warnings.length > 0);
		assert.ok(result.results[0].warnings[0].rule === 'kolibri/theme-require-global-layer');
	});

	it('rejects wrong @layer name in global.scss', async () => {
		const result = await stylelint.lint({
			code: '@layer kol-theme-component { :host { color: red; } }',
			config,
			codeFilename: globalPath,
		});
		assert.ok(result.results[0].warnings.length > 0);
	});

	it('ignores non-global.scss files', async () => {
		const result = await stylelint.lint({
			code: ':host { color: red; }',
			config,
			codeFilename: otherPath,
		});
		assert.equal(result.results[0].warnings.length, 0);
	});
});

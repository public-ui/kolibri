import { describe, it } from 'mocha';
import assert from 'node:assert/strict';
import stylelint from 'stylelint';
import plugin from './allowed-layer-names.js';

const config = {
	plugins: [plugin],
	rules: { 'kolibri/theme-allowed-layer-names': true },
	customSyntax: 'postcss-scss',
};

const themesPath = '/repo/packages/themes/default/src/components/button.scss';
const componentsPath = '/repo/packages/components/src/components/button/style.scss';

describe('kolibri/layer-restrictions-themes', () => {
	it('accepts kol-theme-component layer in themes package', async () => {
		const result = await stylelint.lint({
			code: '@layer kol-theme-component { .button { color: red; } }',
			config,
			codeFilename: themesPath,
		});
		assert.equal(result.results[0].warnings.length, 0);
	});

	it('accepts kol-theme-global layer in themes package', async () => {
		const result = await stylelint.lint({
			code: '@layer kol-theme-global { :host { color: red; } }',
			config,
			codeFilename: themesPath,
		});
		assert.equal(result.results[0].warnings.length, 0);
	});

	it('rejects kol-component layer in themes package', async () => {
		const result = await stylelint.lint({
			code: '@layer kol-component { .button { color: red; } }',
			config,
			codeFilename: themesPath,
		});
		assert.ok(result.results[0].warnings.length > 0);
		assert.ok(result.results[0].warnings[0].rule === 'kolibri/theme-allowed-layer-names');
	});

	it('ignores files outside packages/themes', async () => {
		const result = await stylelint.lint({
			code: '@layer kol-component { .button { color: red; } }',
			config,
			codeFilename: componentsPath,
		});
		assert.equal(result.results[0].warnings.length, 0);
	});
});

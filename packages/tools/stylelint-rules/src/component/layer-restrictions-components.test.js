import { describe, it } from 'mocha';
import assert from 'node:assert/strict';
import stylelint from 'stylelint';
import plugin from './allowed-layer-names.js';

const config = {
	plugins: [plugin],
	rules: { 'kolibri/component-allowed-layer-names': true },
	customSyntax: 'postcss-scss',
};

const componentsPath = '/repo/packages/components/src/components/button/style.scss';
const themesPath = '/repo/packages/themes/default/src/components/button.scss';

describe('kolibri/layer-restrictions-components', () => {
	it('accepts kol-component layer in components package', async () => {
		const result = await stylelint.lint({
			code: '@layer kol-component { .button { color: red; } }',
			config,
			codeFilename: componentsPath,
		});
		assert.equal(result.results[0].warnings.length, 0);
	});

	it('accepts kol-global layer in components package', async () => {
		const result = await stylelint.lint({
			code: '@layer kol-global { :host { color: red; } }',
			config,
			codeFilename: componentsPath,
		});
		assert.equal(result.results[0].warnings.length, 0);
	});

	it('rejects kol-theme-component layer in components package', async () => {
		const result = await stylelint.lint({
			code: '@layer kol-theme-component { .button { color: red; } }',
			config,
			codeFilename: componentsPath,
		});
		assert.ok(result.results[0].warnings.length > 0);
		assert.ok(result.results[0].warnings[0].rule === 'kolibri/component-allowed-layer-names');
	});

	it('ignores files outside packages/components', async () => {
		const result = await stylelint.lint({
			code: '@layer kol-theme-component { .button { color: red; } }',
			config,
			codeFilename: themesPath,
		});
		assert.equal(result.results[0].warnings.length, 0);
	});
});

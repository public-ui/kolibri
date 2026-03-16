import { describe, it } from 'mocha';
import assert from 'node:assert/strict';
import stylelint from 'stylelint';
import plugin from './css-must-be-in-layer.js';

const config = {
	plugins: [plugin],
	rules: { 'kolibri/common-component-css-must-be-in-layer': true },
	customSyntax: 'postcss-scss',
};

const componentPath = '/repo/packages/components/src/components/button/style.scss';
const otherPath = '/repo/packages/components/src/components/button/other.scss';

describe('kolibri/css-must-be-in-layer', () => {
	it('accepts CSS inside @layer in a component style.scss', async () => {
		const result = await stylelint.lint({
			code: '@layer kol-component { .button { color: red; } }',
			config,
			codeFilename: componentPath,
		});
		assert.equal(result.results[0].warnings.length, 0);
	});

	it('rejects CSS outside @layer in a component style.scss', async () => {
		const result = await stylelint.lint({
			code: '.button { color: red; }',
			config,
			codeFilename: componentPath,
		});
		assert.ok(result.results[0].warnings.length > 0);
		assert.ok(result.results[0].warnings[0].rule === 'kolibri/common-component-css-must-be-in-layer');
	});

	it('ignores non-style.scss files', async () => {
		const result = await stylelint.lint({
			code: '.button { color: red; }',
			config,
			codeFilename: otherPath,
		});
		assert.equal(result.results[0].warnings.length, 0);
	});
});

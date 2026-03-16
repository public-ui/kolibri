import { describe, it } from 'mocha';
import assert from 'node:assert/strict';
import stylelint from 'stylelint';
import plugin from './layer-name-convention.js';

const config = {
	plugins: [plugin],
	rules: { 'kolibri/common-layer-name-convention': true },
	customSyntax: 'postcss-scss',
};

const srcPath = '/repo/packages/themes/default/src/components/button.scss';

describe('kolibri/layer-name-convention', () => {
	it('accepts kol-theme-component layer name', async () => {
		const result = await stylelint.lint({
			code: '@layer kol-theme-component { .button { color: red; } }',
			config,
			codeFilename: srcPath,
		});
		const warnings = result.results[0].warnings.filter((w) => w.rule === 'kolibri/common-layer-name-convention');
		assert.equal(warnings.length, 0);
	});

	it('accepts kol-theme-global layer name', async () => {
		const result = await stylelint.lint({
			code: '@layer kol-theme-global { .button { color: red; } }',
			config,
			codeFilename: srcPath,
		});
		const warnings = result.results[0].warnings.filter((w) => w.rule === 'kolibri/common-layer-name-convention');
		assert.equal(warnings.length, 0);
	});

	it('warns about non-standard layer name in src file', async () => {
		const result = await stylelint.lint({
			code: '@layer my-custom-layer { .button { color: red; } }',
			config,
			codeFilename: srcPath,
		});
		const warnings = result.results[0].warnings.filter((w) => w.rule === 'kolibri/common-layer-name-convention');
		assert.ok(warnings.length > 0);
	});

	it('ignores files outside /src/', async () => {
		const result = await stylelint.lint({
			code: '@layer my-custom-layer { .button { color: red; } }',
			config,
			codeFilename: '/repo/dist/button.scss',
		});
		const warnings = result.results[0].warnings.filter((w) => w.rule === 'kolibri/common-layer-name-convention');
		assert.equal(warnings.length, 0);
	});
});

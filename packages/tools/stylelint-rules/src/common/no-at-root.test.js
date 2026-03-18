import { describe, it } from 'mocha';
import assert from 'node:assert/strict';
import stylelint from 'stylelint';
import plugin from './no-at-root.js';

const config = {
	plugins: [plugin],
	rules: { 'kolibri/common-no-at-root': true },
	customSyntax: 'postcss-scss',
};

const path = '/repo/packages/themes/default/src/mixins/_form-field-order.mixin.scss';

describe('kolibri/no-at-root', () => {
	it('rejects @at-root usage', async () => {
		const result = await stylelint.lint({
			code: '.kol-form-field { @at-root .kol-form-field__label { order: 1; } }',
			config,
			codeFilename: path,
		});
		assert.ok(result.results[0].warnings.length > 0);
		assert.ok(result.results[0].warnings[0].rule === 'kolibri/common-no-at-root');
	});

	it('rejects $root: & pattern', async () => {
		const result = await stylelint.lint({
			code: '.kol-form-field { $root: &; }',
			config,
			codeFilename: path,
		});
		assert.ok(result.results[0].warnings.length > 0);
		assert.ok(result.results[0].warnings[0].rule === 'kolibri/common-no-at-root');
	});

	it('accepts flat BEM selectors at mixin root level', async () => {
		const result = await stylelint.lint({
			code: '.kol-form-field__label { order: 1; } .kol-form-field__input { order: 2; }',
			config,
			codeFilename: path,
		});
		assert.equal(result.results[0].warnings.length, 0);
	});

	it('accepts regular SCSS variable assignments that are not & captures', async () => {
		const result = await stylelint.lint({
			code: '.kol-form-field { $color: red; color: $color; }',
			config,
			codeFilename: path,
		});
		assert.equal(result.results[0].warnings.length, 0);
	});
});

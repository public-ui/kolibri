import { describe, it } from 'mocha';
import assert from 'node:assert/strict';
import stylelint from 'stylelint';
import plugin from './disabled-bem-modifier.js';

const config = {
	plugins: [plugin],
	rules: { 'kolibri/common-disabled-bem-modifier': true },
	customSyntax: 'postcss-scss',
};

const lint = async (code) => {
	const result = await stylelint.lint({ code, config, codeFilename: '/repo/packages/themes/default/src/components/button.scss' });
	return result.results[0].warnings;
};

describe('kolibri/common-disabled-bem-modifier', () => {
	for (const code of [
		'button:disabled { color: red; }',
		'.kol-input:not(:disabled):hover { color: red; }',
		'.kol-input:enabled { color: red; }',
		'[disabled] { color: red; }',
		'input[disabled="disabled"] { color: red; }',
		'.kol-form-field:has(:disabled) { color: red; }',
		'.kol-select { &:disabled { color: red; } }',
		'select:disabled option { color: red; }',
		'.kol-range { &::-moz-range-thumb { @at-root .kol-range:not(:disabled)#{&} { cursor: pointer; } } }',
		"[aria-disabled='true'] { color: red; }",
		'.kol-link__interactive-element:not([aria-disabled]):hover { color: red; }',
		".kol-button:has([aria-disabled='true']) { color: red; }",
	]) {
		it(`rejects ${code}`, async () => {
			const warnings = await lint(code);
			assert.equal(warnings.length, 1);
			assert.equal(warnings[0].rule, 'kolibri/common-disabled-bem-modifier');
		});
	}

	for (const code of [
		'.kol-button--disabled { color: red; }',
		'.kol-button:not(.kol-button--disabled) .kol-button__interactive-element:hover { color: red; }',
		'option:disabled { color: red; }',
		'.kol-select optgroup:disabled { color: red; }',
		'option:not(:disabled):hover { color: red; }',
		'.kol-select option { &:disabled { color: red; } }',
		'.kol-input--disabled-hint { color: red; }',
	]) {
		it(`accepts ${code}`, async () => {
			assert.equal((await lint(code)).length, 0);
		});
	}
});

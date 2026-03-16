import { describe, it } from 'mocha';
import assert from 'node:assert/strict';
import stylelint from 'stylelint';
import plugin from './require-component-layer.js';

const config = (layerName, pathPattern, strict = true) => ({
	plugins: [plugin],
	rules: { 'kolibri/common-require-component-layer': [true, { layerName, pathPattern, strict }] },
	customSyntax: 'postcss-scss',
});

const componentsStylePath = '/repo/packages/components/src/components/button/style.scss';
const themesComponentPath = '/repo/packages/themes/default/src/components/button.scss';

describe('kolibri/require-component-layer', () => {
	it('accepts CSS inside the correct @layer (components, strict=false)', async () => {
		const result = await stylelint.lint({
			code: '@layer kol-component { .button { color: red; } }',
			config: config('kol-component', '/packages/components/src/components/', false),
			codeFilename: componentsStylePath,
		});
		assert.equal(result.results[0].warnings.length, 0);
	});

	it('rejects missing @layer when file has CSS rules (components, strict=false)', async () => {
		const result = await stylelint.lint({
			code: '.button { color: red; }',
			config: config('kol-component', '/packages/components/src/components/', false),
			codeFilename: componentsStylePath,
		});
		assert.ok(result.results[0].warnings.length > 0);
		assert.ok(result.results[0].warnings[0].rule === 'kolibri/common-require-component-layer');
	});

	it('accepts CSS inside kol-theme-component (themes, strict=true)', async () => {
		const result = await stylelint.lint({
			code: '@layer kol-theme-component { .button { color: red; } }',
			config: config('kol-theme-component', '/src/components/'),
			codeFilename: themesComponentPath,
		});
		assert.equal(result.results[0].warnings.length, 0);
	});

	it('rejects CSS outside @layer (themes, strict=true)', async () => {
		const result = await stylelint.lint({
			code: '.button { color: red; }',
			config: config('kol-theme-component', '/src/components/'),
			codeFilename: themesComponentPath,
		});
		assert.ok(result.results[0].warnings.length > 0);
		assert.ok(result.results[0].warnings[0].rule === 'kolibri/common-require-component-layer');
	});

	it('rejects wrong @layer name (themes, strict=true)', async () => {
		const result = await stylelint.lint({
			code: '@layer kol-theme-global { .button { color: red; } }',
			config: config('kol-theme-component', '/src/components/'),
			codeFilename: themesComponentPath,
		});
		assert.ok(result.results[0].warnings.length > 0);
	});

	it('ignores files that do not match pathPattern', async () => {
		const result = await stylelint.lint({
			code: '.button { color: red; }',
			config: config('kol-theme-component', '/src/components/'),
			codeFilename: '/repo/packages/themes/default/src/mixins/_button.scss',
		});
		assert.equal(result.results[0].warnings.length, 0);
	});

	it('accepts SCSS variables at file root without @layer (strict=true)', async () => {
		const result = await stylelint.lint({
			code: '$option-height: 40px;\n$visible-options: 5;\n@layer kol-theme-component { .button { color: red; } }',
			config: config('kol-theme-component', '/src/components/'),
			codeFilename: themesComponentPath,
		});
		assert.equal(result.results[0].warnings.length, 0);
	});

	it('rejects real CSS declarations at file root without @layer (strict=true)', async () => {
		const result = await stylelint.lint({
			code: 'color: red;',
			config: config('kol-theme-component', '/src/components/'),
			codeFilename: themesComponentPath,
		});
		assert.ok(result.results[0].warnings.length > 0);
	});

	it('accepts @keyframes content outside @layer (strict=true)', async () => {
		const result = await stylelint.lint({
			code: '@layer kol-theme-component { @keyframes slide-in { from { transform: translateX(-100%); } to { transform: translateX(0); } } }',
			config: config('kol-theme-component', '/src/components/'),
			codeFilename: themesComponentPath,
		});
		assert.equal(result.results[0].warnings.length, 0);
	});
});

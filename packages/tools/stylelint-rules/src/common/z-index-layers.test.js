import { describe, it } from 'mocha';
import assert from 'node:assert/strict';
import stylelint from 'stylelint';
import plugin from './z-index-layers.js';

const config = {
	plugins: [plugin],
	rules: { 'kolibri/common-z-index-layers': true },
	customSyntax: 'postcss-scss',
};

const lint = async (code) => {
	const result = await stylelint.lint({ code, config, codeFilename: '/repo/packages/components/src/components/tooltip/style.scss' });
	return result.results[0].warnings.map((warning) => warning.text);
};

describe('kolibri/common-z-index-layers', () => {
	it('accepts commented values of the low and the high layer', async () => {
		const warnings = await lint(`
.a {
	// above the adornments
	z-index: 1;
}
.b {
	/* above everything except the skip nav */
	z-index: 1008;
}
.c {
	// behind its sibling dot
	z-index: 0;
}`);
		assert.deepEqual(warnings, []);
	});

	it('accepts keywords that set no layer', async () => {
		const warnings = await lint(`
.a {
	// follows the stacking of the parent
	z-index: auto;
}`);
		assert.deepEqual(warnings, []);
	});

	it('rejects values between and beyond the reserved layers', async () => {
		const warnings = await lint(`
.a {
	// between the layers
	z-index: 11;
}
.b {
	// above the high layer
	z-index: 9999;
}
.c {
	// below the base
	z-index: -1;
}`);
		assert.equal(warnings.length, 3);
		assert.ok(warnings.every((text) => text.includes('outside the reserved layers')));
	});

	it('rejects values that cannot be checked', async () => {
		const warnings = await lint(`
.a {
	// from a variable
	z-index: $z-tooltip;
}
.b {
	// from a custom property
	z-index: var(--z, 1);
}`);
		assert.equal(warnings.length, 2);
		assert.ok(warnings.every((text) => text.includes('cannot be checked')));
	});

	it('requires a comment directly above the z-index', async () => {
		const warnings = await lint(`
.a {
	position: relative;
	z-index: 10;
}`);
		assert.equal(warnings.length, 1);
		assert.ok(warnings[0].includes('needs a comment'));
	});
});

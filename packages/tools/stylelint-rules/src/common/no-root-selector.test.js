import { describe, it } from 'mocha';
import assert from 'node:assert/strict';
import stylelint from 'stylelint';
import plugin from './no-root-selector.js';

const config = {
	plugins: [plugin],
	rules: { 'kolibri/common-no-root-selector': true },
	customSyntax: 'postcss-scss',
};

const srcPath = '/repo/packages/themes/default/src/components/button.scss';

describe('kolibri/no-root-selector', () => {
	it('rejects :root selector in src scss file', async () => {
		const result = await stylelint.lint({
			code: ':root { --color: red; }',
			config,
			codeFilename: srcPath,
		});
		assert.ok(result.results[0].warnings.length > 0);
		assert.ok(result.results[0].warnings[0].rule === 'kolibri/common-no-root-selector');
	});

	it('accepts :host selector in src scss file', async () => {
		const result = await stylelint.lint({
			code: ':host { --color: red; }',
			config,
			codeFilename: srcPath,
		});
		assert.equal(result.results[0].warnings.length, 0);
	});

	it('ignores files outside /src/', async () => {
		const result = await stylelint.lint({
			code: ':root { --color: red; }',
			config,
			codeFilename: '/repo/dist/button.css',
		});
		assert.equal(result.results[0].warnings.length, 0);
	});
});

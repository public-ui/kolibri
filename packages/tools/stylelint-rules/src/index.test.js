import { describe, it } from 'mocha';
import assert from 'node:assert/strict';
import allRules from './index.js';

describe('stylelint rules metadata', () => {
	it('exports all 9 rules', () => {
		assert.equal(allRules.length, 9);
	});

	it('verifies each rule defines valid documentation URL pointing to develop branch', () => {
		for (const plugin of allRules) {
			const { ruleName, rule } = plugin;
			assert.ok(ruleName, 'Rule must define ruleName');
			assert.ok(rule.meta, `${ruleName} must define meta`);
			assert.ok(rule.meta.url, `${ruleName} must define meta.url`);

			const url = rule.meta.url;
			assert.ok(
				url.startsWith('https://github.com/public-ui/kolibri/blob/develop/'),
				`${ruleName} documentation URL must point to develop branch, got: ${url}`,
			);
			assert.ok(!url.includes('blob/main'), `${ruleName} documentation URL must not reference dead blob/main branch`);
		}
	});
});

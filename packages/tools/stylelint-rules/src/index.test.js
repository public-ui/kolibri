import { describe, it } from 'mocha';
import assert from 'node:assert/strict';
import commonRules from './common/index.js';
import componentRules from './component/index.js';
import allRules from './index.js';
import themeRules from './theme/index.js';

describe('stylelint rules metadata', () => {
	it('exports all registered rules', () => {
		// Derive expected count dynamically across all rule categories (common, component, theme)
		// to avoid fragile hard-coded count pinning when new rules are added.
		const expectedCount = commonRules.length + componentRules.length + themeRules.length;
		assert.equal(allRules.length, expectedCount);
		assert.ok(allRules.length > 0, 'Expected at least one stylelint rule to be exported');
	});

	it('verifies each rule defines valid documentation URL pointing to develop branch', () => {
		// Asserts that all exported rules provide valid documentation URLs targeting develop
		// and verifies each rule individually without rigid count pinning.
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

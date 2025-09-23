const stylelint = require('stylelint');
const path = require('path');

const ruleName = 'kolibri/require-component-layer';
const messages = stylelint.utils.ruleMessages(ruleName, {
	expected: (filePath) => `Component style.scss files must contain @layer kol-component when they have CSS rules: ${filePath}`,
});

const meta = {
	url: 'https://github.com/public-ui/kolibri/blob/main/AGENTS.md#theming',
	fixable: false,
};

/**
 * Custom stylelint rule to ensure component style.scss files have @layer kol-component:
 * - Only checks style.scss files in packages/components/src/components/
 * - Only reports if file has actual CSS rules (not just imports)
 * - Ensures @layer kol-component is present
 */
const ruleFunction = (primaryOption) => {
	return (root, result) => {
		if (!primaryOption) return;

		const filePath = result.root.source.input.from;
		if (!filePath) return;

		// Normalize path separators for cross-platform compatibility
		const normalizedPath = filePath.replace(/\\/g, '/');
		const fileName = path.basename(filePath);

		// Only check style.scss files in components directory
		const isComponentStyleFile = normalizedPath.includes('/packages/components/src/components/') && fileName === 'style.scss';

		if (!isComponentStyleFile) return;

		// Check if file contains actual CSS rules (not just imports/includes)
		let hasCssRules = false;
		let hasKolComponentLayer = false;

		// Check for CSS rules (selectors with declarations)
		root.walkRules(() => {
			hasCssRules = true;
		});

		// Check for CSS declarations at root level (not in a rule)
		root.walkDecls(() => {
			hasCssRules = true;
		});

		// Check for @include statements outside of @layer blocks
		root.walkAtRules('include', (atRule) => {
			// Check if @include is at root level (not inside @layer)
			let isInLayer = false;
			let parent = atRule.parent;
			while (parent) {
				if (parent.type === 'atrule' && parent.name === 'layer') {
					isInLayer = true;
					break;
				}
				parent = parent.parent;
			}

			// If @include is at root level (not in layer), assume it generates CSS content
			if (!isInLayer) {
				hasCssRules = true;
			}
		});

		// Check for @layer kol-component
		root.walkAtRules('layer', (atRule) => {
			if (atRule.params.includes('kol-component')) {
				hasKolComponentLayer = true;
			}
		});

		// Only report if file has CSS rules but no kol-component layer
		if (hasCssRules && !hasKolComponentLayer) {
			stylelint.utils.report({
				message: messages.expected(normalizedPath),
				node: root,
				result,
				ruleName,
			});
		}
	};
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;
ruleFunction.meta = meta;

module.exports = stylelint.createPlugin(ruleName, ruleFunction);

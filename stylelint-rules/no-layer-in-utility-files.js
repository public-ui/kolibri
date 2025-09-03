const stylelint = require('stylelint');
const path = require('path');

const ruleName = 'kolibri/no-layer-in-utility-files';
const messages = stylelint.utils.ruleMessages(ruleName, {
	rejected: (filePath) => `@layer declarations are not allowed in utility files: ${filePath}`,
});

const meta = {
	url: 'https://github.com/public-ui/kolibri/blob/main/AGENTS.md#theming',
	fixable: false,
};

/**
 * Custom stylelint rule to prevent @layer declarations in utility files:
 * - Files in helpers/ directories
 * - Files in mixins/ directories
 * - Files starting with _ (partial SCSS files)
 */
const ruleFunction = (primaryOption) => {
	return (root, result) => {
		if (!primaryOption) return;

		const filePath = result.root.source.input.from;
		if (!filePath) return;

		// Normalize path separators for cross-platform compatibility
		const normalizedPath = filePath.replace(/\\/g, '/');
		const fileName = path.basename(filePath);

		// Check if file should not contain @layer declarations
		const isInSrc = normalizedPath.includes('/src/');
		const isInHelpers = normalizedPath.includes('/helpers/');
		const isInMixins = normalizedPath.includes('/mixins/');
		const isPartialFile = fileName.startsWith('_');

		// Exception for global styles that need layers
		const isGlobalFile = fileName === '_global.scss';
		const isLayerOrderFile = fileName === '_layer-order.scss';

		// Only apply rule to files within src directories that match our criteria, excluding global files
		if (!isInSrc || !(isInHelpers || isInMixins || isPartialFile) || isGlobalFile || isLayerOrderFile) {
			return;
		}

		// Check for @layer at-rules
		root.walkAtRules('layer', (atRule) => {
			stylelint.utils.report({
				message: messages.rejected(normalizedPath),
				node: atRule,
				result,
				ruleName,
			});
		});
	};
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;
ruleFunction.meta = meta;

module.exports = stylelint.createPlugin(ruleName, ruleFunction);

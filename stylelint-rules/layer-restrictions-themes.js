const stylelint = require('stylelint');
const path = require('path');

const ruleName = 'kolibri/layer-restrictions-themes';
const messages = stylelint.utils.ruleMessages(ruleName, {
	rejected: (layerName, filePath) =>
		`Layer "${layerName}" is not allowed in themes package. Only kol-theme-global and kol-theme-component are allowed: ${filePath}`,
});

const meta = {
	url: 'https://github.com/public-ui/kolibri/blob/main/AGENTS.md#theming',
	fixable: false,
};

/**
 * Custom stylelint rule to restrict @layer declarations in themes packages:
 * - Only allows kol-theme-global and kol-theme-component layers
 * - Applies only to files in packages/themes directory
 */
const ruleFunction = (primaryOption) => {
	return (root, result) => {
		if (!primaryOption) return;

		const filePath = result.root.source.input.from;
		if (!filePath) return;

		// Normalize path separators for cross-platform compatibility
		const normalizedPath = filePath.replace(/\\/g, '/');

		// Only apply rule to files in packages/themes
		if (!normalizedPath.includes('/packages/themes/')) {
			return;
		}

		const allowedLayers = ['kol-theme-global', 'kol-theme-component'];

		// Check for @layer at-rules
		root.walkAtRules('layer', (atRule) => {
			const layerNames = atRule.params.split(',').map((name) => name.trim());

			layerNames.forEach((layerName) => {
				if (!allowedLayers.includes(layerName)) {
					stylelint.utils.report({
						message: messages.rejected(layerName, normalizedPath),
						node: atRule,
						result,
						ruleName,
					});
				}
			});
		});
	};
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;
ruleFunction.meta = meta;

module.exports = stylelint.createPlugin(ruleName, ruleFunction);

const stylelint = require('stylelint');
const path = require('path');

const ruleName = 'kolibri/layer-restrictions-components';
const messages = stylelint.utils.ruleMessages(ruleName, {
	rejected: (layerName, filePath) =>
		`Layer "${layerName}" is not allowed in components package. Only kol-a11y, kol-global, and kol-component are allowed: ${filePath}`,
});

const meta = {
	url: 'https://github.com/public-ui/kolibri/blob/main/AGENTS.md#theming',
	fixable: false,
};

/**
 * Custom stylelint rule to restrict @layer declarations in components package:
 * - Only allows kol-a11y, kol-global, and kol-component layers
 * - Applies only to files in packages/components directory
 */
const ruleFunction = (primaryOption) => {
	return (root, result) => {
		if (!primaryOption) return;

		const filePath = result.root.source.input.from;
		if (!filePath) return;

		// Normalize path separators for cross-platform compatibility
		const normalizedPath = filePath.replace(/\\/g, '/');
		const fileName = path.basename(filePath);

		// Only apply rule to files in packages/components
		if (!normalizedPath.includes('/packages/components/')) {
			return;
		}

		// Exception for a11y.scss which declares all layer ordering
		if (fileName === 'a11y.scss') {
			return;
		}

		// Exception for _layer-order.scss which contains only the layer order definition
		if (fileName === '_layer-order.scss') {
			return;
		}

		const allowedLayers = ['kol-a11y', 'kol-global', 'kol-component'];

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

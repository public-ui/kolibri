import path from 'path';
import stylelint from 'stylelint';

const ruleName = 'kolibri/layer-name-convention';
const messages = stylelint.utils.ruleMessages(ruleName, {
	wrongLayerName: (layerName, filePath) => `Layer name "${layerName}" should use the convention 'kol-theme-global' or 'kol-theme-component': ${filePath}`,
});

const meta = {
	url: 'https://github.com/public-ui/kolibri/blob/main/AGENTS.md#theming',
	fixable: false,
};

/**
 * Custom stylelint rule to warn about non-standard layer names:
 * - Warns if layer names don't follow the convention 'kol-theme-global' or 'kol-theme-component'
 * - Only applies to SCSS files in src/ directory
 * - Provides warnings, not errors
 */
const ruleFunction = (primaryOption) => {
	return (root, result) => {
		if (!primaryOption) return;

		const filePath = result.root.source.input.from;
		if (!filePath) return;

		// Normalize path separators for cross-platform compatibility
		const normalizedPath = filePath.replace(/\\/g, '/');
		const fileName = path.basename(filePath);

		// Only apply to SCSS files in src directory
		const isInSrc = normalizedPath.includes('/src/') && fileName.endsWith('.scss');
		if (!isInSrc) return;

		const allowedLayerNames = ['kol-theme-global', 'kol-theme-component'];

		// Check all @layer declarations for naming convention
		root.walkAtRules('layer', (atRule) => {
			const layerNames = atRule.params.split(',').map((name) => name.trim());

			layerNames.forEach((layerName) => {
				if (!allowedLayerNames.includes(layerName)) {
					stylelint.utils.report({
						message: messages.wrongLayerName(layerName, normalizedPath),
						node: atRule,
						result,
						ruleName,
						severity: 'warning', // This makes it a warning instead of an error
					});
				}
			});
		});
	};
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;
ruleFunction.meta = meta;

export default stylelint.createPlugin(ruleName, ruleFunction);

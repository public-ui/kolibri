import path from 'path';
import stylelint from 'stylelint';

const ruleName = 'kolibri/component-allowed-layer-names';
const messages = stylelint.utils.ruleMessages(ruleName, {
	rejected: (layerName, filePath) =>
		`Layer "${layerName}" is not allowed in components package. Only kol-a11y, kol-global, and kol-component are allowed: ${filePath}`,
});

const meta = {
	url: 'https://github.com/public-ui/kolibri/blob/main/AGENTS.md#theming',
	fixable: false,
};

const ruleFunction = (primaryOption) => {
	return (root, result) => {
		if (!primaryOption) return;

		const filePath = result.root.source.input.from;
		if (!filePath) return;

		const normalizedPath = filePath.replace(/\\/g, '/');
		const fileName = path.basename(filePath);

		if (!normalizedPath.includes('/packages/components/')) return;
		if (fileName === 'a11y.scss' || fileName === '_layer-order.scss' || fileName === 'forced-colors.scss') return;

		const allowedLayers = ['kol-a11y', 'kol-global', 'kol-component', 'kol-forced-colors'];

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

export default stylelint.createPlugin(ruleName, ruleFunction);

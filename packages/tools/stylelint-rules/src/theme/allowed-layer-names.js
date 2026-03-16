import stylelint from 'stylelint';

const ruleName = 'kolibri/theme-allowed-layer-names';
const messages = stylelint.utils.ruleMessages(ruleName, {
	rejected: (layerName, filePath) =>
		`Layer "${layerName}" is not allowed in themes package. Only kol-theme-global and kol-theme-component are allowed: ${filePath}`,
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
		if (!normalizedPath.includes('/packages/themes/')) return;

		const allowedLayers = ['kol-theme-global', 'kol-theme-component'];

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

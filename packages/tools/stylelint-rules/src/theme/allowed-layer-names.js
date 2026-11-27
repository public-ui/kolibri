import stylelint from 'stylelint';

const ruleName = 'kolibri/theme-allowed-layer-names';
const messages = stylelint.utils.ruleMessages(ruleName, {
	rejected: (layerName, filePath) =>
		`Layer "${layerName}" is not allowed in a theme. Only kol-theme-global, kol-theme-component and kol-theme-forced-colors are allowed: ${filePath}`,
});

const defaultPathPattern = '/packages/themes/';

const meta = {
	url: 'https://github.com/public-ui/kolibri/blob/develop/AGENTS.md#theming',
	fixable: false,
};

/**
 * `pathPattern` marks the theme files by a substring of their path; the default matches the themes of the KoliBri monorepo.
 */
const ruleFunction = (primaryOption, secondaryOptions) => {
	return (root, result) => {
		const validOptions = stylelint.utils.validateOptions(
			result,
			ruleName,
			{ actual: primaryOption, possible: [true, false] },
			{ actual: secondaryOptions, possible: { pathPattern: [(value) => typeof value === 'string' && value.length > 0] }, optional: true },
		);
		if (!validOptions || !primaryOption) return;

		const filePath = result.root.source.input.from;
		if (!filePath) return;

		const normalizedPath = filePath.replace(/\\/g, '/');
		if (!normalizedPath.includes(secondaryOptions?.pathPattern ?? defaultPathPattern)) return;

		const allowedLayers = ['kol-theme-global', 'kol-theme-component', 'kol-theme-forced-colors'];

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

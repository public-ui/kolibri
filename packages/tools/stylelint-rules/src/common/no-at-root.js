import stylelint from 'stylelint';

const ruleName = 'kolibri/common-no-at-root';
const messages = stylelint.utils.ruleMessages(ruleName, {
	rejectedAtRoot: (filePath) => `@at-root is not allowed. Use flat BEM selectors at the mixin root level instead: ${filePath}`,
	rejectedRootCapture: (varName, filePath) =>
		`SCSS variable "${varName}: &" captures the current selector – use explicit flat BEM selectors instead: ${filePath}`,
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

		root.walkAtRules('at-root', (atRule) => {
			stylelint.utils.report({
				message: messages.rejectedAtRoot(normalizedPath),
				node: atRule,
				result,
				ruleName,
			});
		});

		root.walkDecls((decl) => {
			if (decl.prop.startsWith('$') && decl.value.trim() === '&') {
				stylelint.utils.report({
					message: messages.rejectedRootCapture(decl.prop, normalizedPath),
					node: decl,
					result,
					ruleName,
				});
			}
		});
	};
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;
ruleFunction.meta = meta;

export default stylelint.createPlugin(ruleName, ruleFunction);

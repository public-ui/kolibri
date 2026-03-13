import stylelint from 'stylelint';

const ruleName = 'kolibri/no-root-selector';
const messages = stylelint.utils.ruleMessages(ruleName, {
	rejected: (filePath) => `":root" selector is not allowed in theme files. Use ":host" for web component encapsulation instead: ${filePath}`,
});

const meta = {
	url: 'https://github.com/public-ui/kolibri/blob/main/AGENTS.md#theming',
	fixable: false,
};

/**
 * Custom stylelint rule to prevent :root selector usage in theme files:
 * - :root affects global scope and breaks web component encapsulation
 * - Use :host instead for proper component-scoped styling
 * - Applies to all SCSS files in src/ directory
 */
const ruleFunction = (primaryOption) => {
	return (root, result) => {
		if (!primaryOption) return;

		const filePath = result.root.source.input.from;
		if (!filePath) return;

		// Normalize path separators for cross-platform compatibility
		const normalizedPath = filePath.replace(/\\/g, '/');

		// Only apply to SCSS files in src directory
		const isInSrc = normalizedPath.includes('/src/') && normalizedPath.endsWith('.scss');
		if (!isInSrc) return;

		// Check for :root selectors
		root.walkRules((rule) => {
			if (rule.selector.includes(':root')) {
				stylelint.utils.report({
					message: messages.rejected(normalizedPath),
					node: rule,
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

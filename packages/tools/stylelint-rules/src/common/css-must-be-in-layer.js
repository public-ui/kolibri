import path from 'path';
import stylelint from 'stylelint';

const ruleName = 'kolibri/common-component-css-must-be-in-layer';
const messages = stylelint.utils.ruleMessages(ruleName, {
	rejected: (selector, filePath) => `CSS rule "${selector}" must be inside a @layer declaration in style.scss files: ${filePath}`,
	rejectedInclude: (includeParams, filePath) => `@include ${includeParams} must be inside a @layer declaration in style.scss files: ${filePath}`,
});

const meta = {
	url: 'https://github.com/public-ui/kolibri/blob/main/AGENTS.md#theming',
	fixable: false,
};

function isInsideLayer(node, root) {
	let current = node.parent;
	while (current && current !== root) {
		if (current.type === 'atrule' && current.name === 'layer') return true;
		current = current.parent;
	}
	return false;
}

const ruleFunction = (primaryOption) => {
	return (root, result) => {
		if (!primaryOption) return;

		const filePath = result.root.source.input.from;
		if (!filePath) return;

		const normalizedPath = filePath.replace(/\\/g, '/');
		const fileName = path.basename(filePath);
		const isComponentStyleFile = normalizedPath.includes('/packages/components/src/components/') && fileName === 'style.scss';
		if (!isComponentStyleFile) return;

		root.walkRules((rule) => {
			if (!isInsideLayer(rule, root)) {
				stylelint.utils.report({
					message: messages.rejected(rule.selector, normalizedPath),
					node: rule,
					result,
					ruleName,
				});
			}
		});

		root.walkAtRules('include', (atRule) => {
			if (!isInsideLayer(atRule, root)) {
				stylelint.utils.report({
					message: messages.rejectedInclude(atRule.params, normalizedPath),
					node: atRule,
					result,
					ruleName,
				});
			}
		});

		root.walkDecls((decl) => {
			if (decl.parent === root) {
				stylelint.utils.report({
					message: messages.rejected(`declaration "${decl.prop}: ${decl.value}"`, normalizedPath),
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

import path from 'path';
import stylelint from 'stylelint';

const ruleName = 'kolibri/theme-require-global-layer';
const messages = stylelint.utils.ruleMessages(ruleName, {
	mustHaveLayer: (selector, filePath) => `CSS rule "${selector}" in global.scss must be inside @layer kol-theme-global: ${filePath}`,
	wrongLayer: (layerName, filePath) => `global.scss must use @layer kol-theme-global, not @layer ${layerName}: ${filePath}`,
	mustHaveIncludeInLayer: (includeParams, filePath) => `@include ${includeParams} in global.scss must be inside @layer kol-theme-global: ${filePath}`,
});

const meta = {
	url: 'https://github.com/public-ui/kolibri/blob/main/AGENTS.md#theming',
	fixable: false,
};

const cssGeneratingMixins = [
	'badge-text-hint',
	'button',
	'card',
	'checkbox',
	'custom-suggestions-option',
	'custom-suggestions-options-group',
	'custom-suggestions-toggle',
	'field-control',
	'focus-outline',
	'form-field-order',
	'kol-alert',
	'kol-button',
	'kol-custom-suggestions-option',
	'kol-custom-suggestions-options-group',
	'kol-custom-suggestions-toggle',
	'kol-form-field',
	'kol-input',
	'kol-input-container',
	'kol-link',
	'kol-pagination',
	'kol-popover-button',
	'kol-table-settings',
	'kol-table-stateless',
	'link',
	'listbox-common',
	'radio',
	'typography',
];

function isInsideGlobalLayer(node, root) {
	let current = node.parent;
	while (current && current !== root) {
		if (current.type === 'atrule' && current.name === 'layer' && current.params === 'kol-theme-global') return true;
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
		if (fileName !== 'global.scss') return;

		root.walkAtRules('layer', (atRule) => {
			if (atRule.params !== 'kol-theme-global') {
				stylelint.utils.report({
					message: messages.wrongLayer(atRule.params, normalizedPath),
					node: atRule,
					result,
					ruleName,
				});
			}
		});

		root.walkRules((rule) => {
			if (!isInsideGlobalLayer(rule, root)) {
				stylelint.utils.report({
					message: messages.mustHaveLayer(rule.selector, normalizedPath),
					node: rule,
					result,
					ruleName,
				});
			}
		});

		root.walkAtRules('include', (atRule) => {
			const isCssGeneratingMixin = cssGeneratingMixins.some((mixin) => atRule.params.includes(mixin));
			if (isCssGeneratingMixin && !isInsideGlobalLayer(atRule, root)) {
				stylelint.utils.report({
					message: messages.mustHaveIncludeInLayer(atRule.params, normalizedPath),
					node: atRule,
					result,
					ruleName,
				});
			}
		});

		root.walkDecls((decl) => {
			if (decl.parent === root) {
				stylelint.utils.report({
					message: messages.mustHaveLayer(`declaration "${decl.prop}: ${decl.value}"`, normalizedPath),
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

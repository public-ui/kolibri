import path from 'path';
import stylelint from 'stylelint';

const ruleName = 'kolibri/require-global-layer';
const messages = stylelint.utils.ruleMessages(ruleName, {
	mustHaveLayer: (selector, filePath) => `CSS rule "${selector}" in global.scss must be inside @layer kol-theme-global: ${filePath}`,
	wrongLayer: (layerName, filePath) => `global.scss must use @layer kol-theme-global, not @layer ${layerName}: ${filePath}`,
	mustHaveIncludeInLayer: (includeParams, filePath) => `@include ${includeParams} in global.scss must be inside @layer kol-theme-global: ${filePath}`,
});

const meta = {
	url: 'https://github.com/public-ui/kolibri/blob/main/AGENTS.md#theming',
	fixable: false,
};

/**
 * Custom stylelint rule to ensure global.scss uses only @layer kol-theme-global:
 * - Only applies to global.scss files
 * - All CSS rules, declarations, and CSS-generating @includes must be in @layer kol-theme-global
 * - Only @layer kol-theme-global is allowed
 */
const ruleFunction = (primaryOption) => {
	return (root, result) => {
		if (!primaryOption) return;

		const filePath = result.root.source.input.from;
		if (!filePath) return;

		// Normalize path separators for cross-platform compatibility
		const normalizedPath = filePath.replace(/\\/g, '/');
		const fileName = path.basename(filePath);

		// Only apply to global.scss files
		const isGlobalFile = fileName === 'global.scss';
		if (!isGlobalFile) return;

		// Check all @layer declarations - only kol-theme-global allowed
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

		// Check all CSS rules - must be in kol-theme-global layer
		root.walkRules((rule) => {
			let currentParent = rule.parent;
			let isInCorrectLayer = false;

			while (currentParent && currentParent !== root) {
				if (currentParent.type === 'atrule' && currentParent.name === 'layer' && currentParent.params === 'kol-theme-global') {
					isInCorrectLayer = true;
					break;
				}
				currentParent = currentParent.parent;
			}

			if (!isInCorrectLayer) {
				stylelint.utils.report({
					message: messages.mustHaveLayer(rule.selector, normalizedPath),
					node: rule,
					result,
					ruleName,
				});
			}
		});

		// Check CSS-generating @includes - must be in kol-theme-global layer
		root.walkAtRules('include', (atRule) => {
			const cssGeneratingMixins = [
				'kol-alert',
				'kol-form-field',
				'kol-input-container',
				'kol-input',
				'kol-button',
				'kol-link',
				'kol-pagination',
				'kol-popover-button',
				'kol-table-settings',
				'kol-table-stateless',
				'kol-custom-suggestions-option',
				'kol-custom-suggestions-options-group',
				'kol-custom-suggestions-toggle',
				'badge-text-hint',
				'button',
				'card',
				'checkbox',
				'custom-suggestions-option',
				'custom-suggestions-options-group',
				'custom-suggestions-toggle',
				'field-control',
				'form-field-order',
				'focus-outline',
				'link',
				'listbox-common',
				'radio',
				'typography',
			];

			const isCssGeneratingMixin = cssGeneratingMixins.some((mixin) => atRule.params.includes(mixin));

			if (isCssGeneratingMixin) {
				let currentParent = atRule.parent;
				let isInCorrectLayer = false;

				while (currentParent && currentParent !== root) {
					if (currentParent.type === 'atrule' && currentParent.name === 'layer' && currentParent.params === 'kol-theme-global') {
						isInCorrectLayer = true;
						break;
					}
					currentParent = currentParent.parent;
				}

				if (!isInCorrectLayer) {
					stylelint.utils.report({
						message: messages.mustHaveIncludeInLayer(atRule.params, normalizedPath),
						node: atRule,
						result,
						ruleName,
					});
				}
			}
		});

		// Check root-level declarations - must be in layer
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

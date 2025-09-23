const stylelint = require('stylelint');
const path = require('path');

const ruleName = 'kolibri/css-must-be-in-layer';
const messages = stylelint.utils.ruleMessages(ruleName, {
	rejected: (selector, filePath) => `CSS rule "${selector}" must be inside a @layer declaration in style.scss files: ${filePath}`,
	rejectedInclude: (includeParams, filePath) => `@include ${includeParams} must be inside a @layer declaration in style.scss files: ${filePath}`,
});

const meta = {
	url: 'https://github.com/public-ui/kolibri/blob/main/AGENTS.md#theming',
	fixable: false,
};

/**
 * Custom stylelint rule to ensure all CSS content in style.scss files is inside @layer:
 * - Only checks style.scss files in packages/components/src/components/
 * - Reports CSS rules, declarations, and @include statements outside of @layer
 * - Ignores @use, @import, and other non-CSS content
 */
const ruleFunction = (primaryOption) => {
	return (root, result) => {
		if (!primaryOption) return;

		const filePath = result.root.source.input.from;
		if (!filePath) return;

		// Normalize path separators for cross-platform compatibility
		const normalizedPath = filePath.replace(/\\/g, '/');
		const fileName = path.basename(filePath);

		// Only check style.scss files in components directory
		const isComponentStyleFile = normalizedPath.includes('/packages/components/src/components/') && fileName === 'style.scss';

		if (!isComponentStyleFile) return;

		// Track if we're currently inside a @layer declaration
		let insideLayer = false;

		// Check all rules (selectors with declarations)
		root.walkRules((rule) => {
			// Check if this rule is inside a @layer
			let currentParent = rule.parent;
			let isInLayer = false;

			while (currentParent && currentParent !== root) {
				if (currentParent.type === 'atrule' && currentParent.name === 'layer') {
					isInLayer = true;
					break;
				}
				currentParent = currentParent.parent;
			}

			if (!isInLayer) {
				stylelint.utils.report({
					message: messages.rejected(rule.selector, normalizedPath),
					node: rule,
					result,
					ruleName,
				});
			}
		});

		// Check all @include statements that generate CSS content
		root.walkAtRules('include', (atRule) => {
			// These mixins generate CSS content and should be in a layer
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
			];

			const isCssGeneratingMixin = cssGeneratingMixins.some((mixin) => atRule.params.includes(mixin));

			if (isCssGeneratingMixin) {
				// Check if this @include is inside a @layer
				let currentParent = atRule.parent;
				let isInLayer = false;

				while (currentParent && currentParent !== root) {
					if (currentParent.type === 'atrule' && currentParent.name === 'layer') {
						isInLayer = true;
						break;
					}
					currentParent = currentParent.parent;
				}

				if (!isInLayer) {
					stylelint.utils.report({
						message: messages.rejectedInclude(atRule.params, normalizedPath),
						node: atRule,
						result,
						ruleName,
					});
				}
			}
		});

		// Check for root-level declarations (CSS properties not in rules)
		root.walkDecls((decl) => {
			// Only check declarations that are direct children of root
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

module.exports = stylelint.createPlugin(ruleName, ruleFunction);

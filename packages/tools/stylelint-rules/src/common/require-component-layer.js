import path from 'path';
import stylelint from 'stylelint';

const ruleName = 'kolibri/common-require-component-layer';
const messages = stylelint.utils.ruleMessages(ruleName, {
	mustHaveLayer: (selector, layerName, filePath) => `CSS rule "${selector}" must be inside @layer ${layerName}: ${filePath}`,
	wrongLayer: (actual, expected, filePath) => `Must use @layer ${expected}, not @layer ${actual}: ${filePath}`,
	mustHaveIncludeInLayer: (includeParams, layerName, filePath) => `@include ${includeParams} must be inside @layer ${layerName}: ${filePath}`,
	missingLayer: (layerName, filePath) => `File must contain @layer ${layerName} when it has CSS rules: ${filePath}`,
});

const meta = {
	url: 'https://github.com/public-ui/kolibri/blob/main/AGENTS.md#theming',
	fixable: false,
};

function isInsideLayer(node, root, layerName) {
	let current = node.parent;
	while (current && current !== root) {
		if (current.type === 'atrule' && current.name === 'layer' && current.params === layerName) return true;
		current = current.parent;
	}
	return false;
}

/**
 * Custom stylelint rule to ensure component SCSS files use the correct @layer.
 *
 * Options:
 *   primaryOption: true
 *   secondaryOptions:
 *     layerName  {string} – required, e.g. "kol-component" or "kol-theme-component"
 *     pathPattern {string} – required, substring that must be present in the file path,
 *                            e.g. "/packages/components/src/components/" or "/src/components/"
 *     strict     {boolean} – optional (default true). When true every CSS rule/include is
 *                            checked individually. When false only the presence of the layer
 *                            is checked (legacy behaviour for packages/components).
 */
const ruleFunction = (primaryOption, secondaryOptions) => {
	return (root, result) => {
		if (!primaryOption) return;

		const layerName = secondaryOptions?.layerName;
		const pathPattern = secondaryOptions?.pathPattern;
		const strict = secondaryOptions?.strict !== false;

		if (!layerName || !pathPattern) return;

		const filePath = result.root.source.input.from;
		if (!filePath) return;

		const normalizedPath = filePath.replace(/\\/g, '/');
		const fileName = path.basename(filePath);

		if (!normalizedPath.includes(pathPattern) || !fileName.endsWith('.scss')) return;

		// Skip partial/utility files (start with _) – they are @use-d into real component files
		if (fileName.startsWith('_')) return;

		// Skip basis preset files that use their own layers (a11y, preset, etc.)
		if (fileName === 'a11y.scss' || fileName === 'preset.scss' || fileName === 'forced-colors.scss') return;

		if (!strict) {
			// Legacy mode: just check that @layer <layerName> exists when there are CSS rules
			let hasCssRules = false;
			let hasLayer = false;

			root.walkRules(() => {
				hasCssRules = true;
			});
			root.walkDecls(() => {
				hasCssRules = true;
			});
			root.walkAtRules('include', (atRule) => {
				const isInLayer = isInsideLayer(atRule, root, layerName);
				if (!isInLayer) hasCssRules = true;
			});
			root.walkAtRules('layer', (atRule) => {
				if (atRule.params.includes(layerName)) hasLayer = true;
			});

			if (hasCssRules && !hasLayer) {
				stylelint.utils.report({
					message: messages.missingLayer(layerName, normalizedPath),
					node: root,
					result,
					ruleName,
				});
			}
			return;
		}

		// Strict mode: all CSS rules / includes must be inside the correct @layer
		root.walkAtRules('layer', (atRule) => {
			if (atRule.params !== layerName) {
				stylelint.utils.report({
					message: messages.wrongLayer(atRule.params, layerName, normalizedPath),
					node: atRule,
					result,
					ruleName,
				});
			}
		});

		root.walkRules((rule) => {
			// Skip @keyframes content (from/to/percentages)
			let isInKeyframes = false;
			let parent = rule.parent;
			while (parent) {
				if (parent.type === 'atrule' && parent.name === 'keyframes') {
					isInKeyframes = true;
					break;
				}
				parent = parent.parent;
			}
			if (isInKeyframes) return;

			if (!isInsideLayer(rule, root, layerName)) {
				stylelint.utils.report({
					message: messages.mustHaveLayer(rule.selector, layerName, normalizedPath),
					node: rule,
					result,
					ruleName,
				});
			}
		});

		root.walkAtRules('include', (atRule) => {
			if (!isInsideLayer(atRule, root, layerName)) {
				stylelint.utils.report({
					message: messages.mustHaveIncludeInLayer(atRule.params, layerName, normalizedPath),
					node: atRule,
					result,
					ruleName,
				});
			}
		});

		root.walkDecls((decl) => {
			// Only flag real CSS declarations at root level – skip SCSS variables ($foo: …)
			if (decl.parent === root && !decl.prop.startsWith('$')) {
				stylelint.utils.report({
					message: messages.mustHaveLayer(`declaration "${decl.prop}: ${decl.value}"`, layerName, normalizedPath),
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

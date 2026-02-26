import path from 'path';
import stylelint from 'stylelint';

const ruleName = 'kolibri/no-layer-in-non-component-files';
const messages = stylelint.utils.ruleMessages(ruleName, {
	rejected: (filePath) => `@layer declarations are not allowed in this file: ${filePath}`,
});

const meta = {
	url: 'https://github.com/public-ui/kolibri/blob/main/AGENTS.md#theming',
	fixable: false,
};

/**
 * Custom stylelint rule to prevent @layer declarations in non-component/non-global files:
 * - All SCSS files in src/ directory that are NOT in src/components/ and NOT global.scss
 * - Ensures only component files and global.scss can use @layer declarations
 */
const ruleFunction = (primaryOption) => {
	return (root, result) => {
		if (!primaryOption) return;

		const filePath = result.root.source.input.from;
		if (!filePath) return;

		// Normalize path separators for cross-platform compatibility
		const normalizedPath = filePath.replace(/\\/g, '/');
		const fileName = path.basename(filePath);

		// Check if this is a SCSS file in src directory
		const isInSrc = normalizedPath.includes('/src/') && fileName.endsWith('.scss');
		// Check if this is specifically a component file (which are allowed to have layers)
		const isComponentFile = normalizedPath.includes('/src/components/');
		// Check if this is global.scss (which is allowed to have layers)
		const isGlobalFile = fileName === 'global.scss';

		// Only apply rule to SCSS files in src that are NOT component files and NOT global.scss
		if (!isInSrc || isComponentFile || isGlobalFile) {
			return;
		}

		// Check for @layer at-rules and report them as violations
		root.walkAtRules('layer', (atRule) => {
			stylelint.utils.report({
				message: messages.rejected(normalizedPath),
				node: atRule,
				result,
				ruleName,
			});
		});
	};
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;
ruleFunction.meta = meta;

export default stylelint.createPlugin(ruleName, ruleFunction);

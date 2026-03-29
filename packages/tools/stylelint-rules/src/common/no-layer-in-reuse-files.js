import path from 'path';
import stylelint from 'stylelint';

const ruleName = 'kolibri/common-no-layer-in-reuse-files';
const messages = stylelint.utils.ruleMessages(ruleName, {
	rejected: (filePath) => `@layer declarations are not allowed in utility files: ${filePath}`,
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
		const fileName = path.basename(filePath);
		const isInSrc = normalizedPath.includes('/src/');
		const pathParts = normalizedPath.split('/');
		const isInHelpers = pathParts.some((part) => part === 'helpers');
		const isInMixins = pathParts.some((part) => part === 'mixins');
		const isPartialFile = fileName.startsWith('_');
		const isGlobalFile = fileName === '_global.scss';
		const isLayerOrderFile = fileName === '_layer-order.scss';

		if (!isInSrc || !(isInHelpers || isInMixins || isPartialFile) || isGlobalFile || isLayerOrderFile) return;

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

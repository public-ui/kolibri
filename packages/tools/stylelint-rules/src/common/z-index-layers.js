import stylelint from 'stylelint';

const ruleName = 'kolibri/common-z-index-layers';
const messages = stylelint.utils.ruleMessages(ruleName, {
	outOfLayer: (value) => `z-index "${value}" is outside the reserved layers: use 0, 1 to 10 (low layer) or 1001 to 1010 (high layer).`,
	notLiteral: (value) => `z-index "${value}" cannot be checked against the reserved layers: use a literal integer or "auto".`,
	missingComment: () => 'z-index needs a comment directly above it that names what the element lies above or below.',
});

const meta = {
	url: 'https://github.com/public-ui/kolibri/blob/develop/docs/arc42/09-architecture-decisions.md#adr-019-reserved-z-index-layers',
	fixable: false,
};

/** Keywords that set no layer of their own. */
const KEYWORDS = new Set(['auto', 'inherit', 'initial', 'revert', 'revert-layer', 'unset']);

const isInReservedLayer = (index) => (index >= 0 && index <= 10) || (index >= 1001 && index <= 1010);

/**
 * Enforces the reserved z-index layers of ADR-019: every z-index of a component or theme is a
 * literal in 0, 1 to 10 or 1001 to 1010, and a comment directly above it states what the element
 * lies above or below.
 */
const ruleFunction = (primaryOption) => {
	return (root, result) => {
		if (!primaryOption) return;

		root.walkDecls(/^z-index$/i, (decl) => {
			const value = decl.value.trim();
			if (!KEYWORDS.has(value.toLowerCase())) {
				if (!/^-?\d+$/.test(value)) {
					stylelint.utils.report({ message: messages.notLiteral(value), node: decl, result, ruleName });
				} else if (!isInReservedLayer(Number(value))) {
					stylelint.utils.report({ message: messages.outOfLayer(value), node: decl, result, ruleName });
				}
			}

			if (decl.prev()?.type !== 'comment') {
				stylelint.utils.report({ message: messages.missingComment(), node: decl, result, ruleName });
			}
		});
	};
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;
ruleFunction.meta = meta;

export default stylelint.createPlugin(ruleName, ruleFunction);

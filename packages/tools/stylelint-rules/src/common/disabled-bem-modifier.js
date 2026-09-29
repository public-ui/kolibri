import stylelint from 'stylelint';

const ruleName = 'kolibri/common-disabled-bem-modifier';
const messages = stylelint.utils.ruleMessages(ruleName, {
	rejected: (match) =>
		`"${match}" is not a styling hook for the disabled state. KoliBri never renders the native "disabled" attribute, and "aria-disabled" is semantics only: use the BEM "--disabled" modifier of the block instead.`,
});

const meta = {
	url: 'https://github.com/public-ui/kolibri/blob/develop/packages/tools/eslint-config/README.md#kolibrino-native-disabled',
	fixable: false,
};

const NATIVE_DISABLED_PATTERN = /:disabled\b|:enabled\b|\[\s*disabled\s*(?:[~|^$*]?=[^\]]*)?\]/g;
const ARIA_DISABLED_PATTERN = /\[\s*aria-disabled\s*(?:[~|^$*]?=[^\]]*)?\]/g;
const ALLOWED_COMPOUND = /^(?:option|optgroup)(?![\w-])/;
const COMBINATOR = /[\s,>+~]/;

/**
 * Returns the compound selector that owns the match at `index`. A match inside a pseudo-class
 * function (e.g. `option:not(:disabled)`) belongs to the compound that holds the function.
 */
function getOwningCompound(selector, index) {
	let depth = 0;
	let position = index - 1;
	for (; position >= 0; position--) {
		const char = selector[position];
		if (char === ')') {
			depth++;
		} else if (char === '(') {
			if (depth === 0) {
				continue;
			}
			depth--;
		} else if (depth === 0 && COMBINATOR.test(char)) {
			break;
		}
	}
	return selector.slice(position + 1, index).trim();
}

function getLastCompound(selector) {
	const last = selector.split(',').pop() ?? '';
	return getOwningCompound(last, last.length);
}

function isAllowed(rule, compound) {
	if (ALLOWED_COMPOUND.test(compound)) {
		return true;
	}
	if (compound.startsWith('&') && rule.parent?.type === 'rule') {
		return ALLOWED_COMPOUND.test(getLastCompound(rule.parent.selector));
	}
	return false;
}

/**
 * The disabled state is styled through the BEM `--disabled` modifier of a block only.
 *
 * - `:disabled`, `:enabled` and `[disabled]` never match, because KoliBri never renders the native
 *   attribute (see the ESLint rule `kolibri/no-native-disabled`); they silently drop styles or turn
 *   hover guards into no-ops. Only `option` and `optgroup`, which keep native `disabled` inside a
 *   `<select>`, may use them.
 * - `[aria-disabled]` is semantics for assistive technology, not a styling hook.
 */
const ruleFunction = (primaryOption) => {
	return (root, result) => {
		if (!primaryOption) return;

		const report = (node, match) =>
			stylelint.utils.report({
				message: messages.rejected(match[0]),
				node,
				result,
				ruleName,
				word: match[0],
			});

		const check = (node, selector) => {
			for (const match of selector.matchAll(NATIVE_DISABLED_PATTERN)) {
				if (!isAllowed(node, getOwningCompound(selector, match.index))) {
					report(node, match);
				}
			}
			for (const match of selector.matchAll(ARIA_DISABLED_PATTERN)) {
				report(node, match);
			}
		};

		root.walkRules((rule) => check(rule, rule.selector));
		// Sass `@at-root <selector>` carries its selector in the at-rule params.
		root.walkAtRules('at-root', (atRule) => check(atRule, atRule.params));
	};
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;
ruleFunction.meta = meta;

export default stylelint.createPlugin(ruleName, ruleFunction);

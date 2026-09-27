/**
 * @fileoverview ESLint rule enforcing KoliBri's disabled model: a disabled interactive
 * element stays focusable and is marked with `aria-disabled`, it never carries the native
 * `disabled` attribute.
 *
 * The native `disabled` attribute removes an element from the tab order and hides it from
 * keyboard and screen reader users, so its tooltip can never be reached by focus. KoliBri
 * therefore renders `aria-disabled="true"` and blocks activation in the event handlers.
 *
 * The rule reports, on intrinsic elements (lowercase JSX tags without a hyphen):
 *   - a `disabled` attribute, written directly or as a key of a spread object literal;
 *   - a missing `aria-disabled` attribute on `a`, `button`, `input`, `select`, `summary`
 *     and `textarea`. Elements without a disabled state declare `aria-disabled={undefined}`,
 *     which renders nothing but documents the decision.
 *
 * Exceptions:
 *   - `option` and `optgroup` keep native `disabled`: they are not tab stops, and
 *     `aria-disabled` does not stop the browser from selecting them inside a `<select>`.
 *   - `<input type="hidden">` and purely decorative controls (`aria-hidden="true"` together
 *     with `tabIndex={-1}`) need no `aria-disabled`.
 *
 * Example configuration:
 *
 * ```js
 * 'kolibri/no-native-disabled': 'error'
 * ```
 */

const NATIVE_DISABLED_ALLOWED = new Set(['optgroup', 'option']);
const ARIA_DISABLED_REQUIRED = new Set(['a', 'button', 'input', 'select', 'summary', 'textarea']);
const MAX_SPREAD_DEPTH = 3;

/** @type {import('eslint').Rule.RuleModule} */
export default {
	meta: {
		type: 'problem',
		docs: {
			description: 'Forbid the native `disabled` attribute and require `aria-disabled` on interactive intrinsic elements',
		},
		schema: [],
		messages: {
			nativeDisabled:
				'Do not render the native `disabled` attribute on <{{element}}>. Use `aria-disabled` and block activation in the event handlers, so the element stays focusable.',
			nativeDisabledSpread: 'The object spread onto <{{element}}> contains a `disabled` key, which renders the native attribute. Use `aria-disabled` instead.',
			ariaDisabledRequired:
				'<{{element}}> must declare its disabled state with `aria-disabled`. Use `aria-disabled={undefined}` if the element can never be disabled.',
		},
	},

	create(context) {
		const sourceCode = context.sourceCode;

		function getElementName(openingElement) {
			const name = openingElement.name;
			if (name.type !== 'JSXIdentifier' || !/^[a-z][a-z0-9]*$/.test(name.name)) {
				return null;
			}
			return name.name;
		}

		function unwrapExpression(node) {
			let current = node;
			while (current && (current.type === 'TSAsExpression' || current.type === 'TSSatisfiesExpression' || current.type === 'TSTypeAssertion')) {
				current = current.expression;
			}
			return current;
		}

		function findVariable(scope, name) {
			let current = scope;
			while (current) {
				const variable = current.set.get(name);
				if (variable) {
					return variable;
				}
				current = current.upper;
			}
			return null;
		}

		/**
		 * Resolves the object literal behind a spread argument (inline or `const x = {…}` in scope)
		 * and returns its static keys, following nested spreads up to `MAX_SPREAD_DEPTH` levels.
		 */
		function collectSpreadKeys(argument, scope, depth = 0) {
			const keys = new Set();
			if (depth > MAX_SPREAD_DEPTH) {
				return keys;
			}

			let object = unwrapExpression(argument);
			if (object && object.type === 'Identifier') {
				const variable = findVariable(scope, object.name);
				const definition = variable?.defs.find((def) => def.type === 'Variable' && def.node.init);
				object = definition ? unwrapExpression(definition.node.init) : null;
			}
			if (!object || object.type !== 'ObjectExpression') {
				return keys;
			}

			for (const property of object.properties) {
				if (property.type === 'SpreadElement') {
					collectSpreadKeys(property.argument, scope, depth + 1).forEach((key) => keys.add(key));
				} else if (!property.computed && property.key.type === 'Identifier') {
					keys.add(property.key.name);
				} else if (property.key.type === 'Literal' && typeof property.key.value === 'string') {
					keys.add(property.key.value);
				}
			}
			return keys;
		}

		function findAttribute(openingElement, name) {
			return openingElement.attributes.find(
				(attribute) => attribute.type === 'JSXAttribute' && attribute.name.type === 'JSXIdentifier' && attribute.name.name === name,
			);
		}

		function getStaticValue(attribute) {
			if (!attribute || !attribute.value) {
				return attribute ? true : undefined;
			}
			if (attribute.value.type === 'Literal') {
				return attribute.value.value;
			}
			if (attribute.value.type === 'JSXExpressionContainer') {
				const expression = attribute.value.expression;
				if (expression.type === 'Literal') {
					return expression.value;
				}
				if (expression.type === 'UnaryExpression' && expression.operator === '-' && expression.argument.type === 'Literal') {
					return -expression.argument.value;
				}
			}
			return undefined;
		}

		function isDecorative(openingElement) {
			const ariaHidden = getStaticValue(findAttribute(openingElement, 'aria-hidden'));
			const tabIndex = getStaticValue(findAttribute(openingElement, 'tabIndex'));
			return (ariaHidden === true || ariaHidden === 'true') && (tabIndex === -1 || tabIndex === '-1');
		}

		return {
			JSXOpeningElement(node) {
				const element = getElementName(node);
				if (!element) {
					return;
				}

				const scope = sourceCode.getScope(node);
				let hasAriaDisabled = false;

				for (const attribute of node.attributes) {
					if (attribute.type === 'JSXAttribute' && attribute.name.type === 'JSXIdentifier') {
						if (attribute.name.name === 'disabled' && !NATIVE_DISABLED_ALLOWED.has(element)) {
							context.report({ node: attribute, messageId: 'nativeDisabled', data: { element } });
						}
						if (attribute.name.name === 'aria-disabled') {
							hasAriaDisabled = true;
						}
					} else if (attribute.type === 'JSXSpreadAttribute') {
						const keys = collectSpreadKeys(attribute.argument, scope);
						if (keys.has('disabled') && !NATIVE_DISABLED_ALLOWED.has(element)) {
							context.report({ node: attribute, messageId: 'nativeDisabledSpread', data: { element } });
						}
						if (keys.has('aria-disabled')) {
							hasAriaDisabled = true;
						}
					}
				}

				if (hasAriaDisabled || !ARIA_DISABLED_REQUIRED.has(element)) {
					return;
				}
				if (element === 'input' && getStaticValue(findAttribute(node, 'type')) === 'hidden') {
					return;
				}
				if (isDecorative(node)) {
					return;
				}
				context.report({ node, messageId: 'ariaDisabledRequired', data: { element } });
			},
		};
	},
};

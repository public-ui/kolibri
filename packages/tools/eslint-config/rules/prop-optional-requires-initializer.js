/**
 * @fileoverview ESLint rule: an optional `@Prop` carries its documented default as initializer.
 *
 * The initializer of a `@Prop` field is the documented default (custom-elements.json, adapter
 * IntelliSense): an optional prop carries its default there. The stable internal state comes
 * from the component's props config (ARC42 §4, #11435) — the initializer never feeds the
 * render props. Runs as a warning until the initializer migration of #11435 has mirrored
 * every default, then flips to an error.
 *
 * ❌ @Prop() public _unit?: UnitPropType;
 * ✅ @Prop() public _unit?: UnitPropType = '%';
 */

/** @type {import('eslint').Rule.RuleModule} */
export default {
	meta: {
		type: 'problem',
		docs: {
			description: 'An optional @Prop must have an initializer: it is the documented default',
		},
		schema: [],
		messages: {
			optionalMissingValue: "'{{name}}' is optional — an optional @Prop must have an initializer: it is the documented default.",
		},
	},

	create(context) {
		const isPropDecorator = (decorator) => {
			const expression = decorator.expression;
			return (
				(expression.type === 'CallExpression' && expression.callee.type === 'Identifier' && expression.callee.name === 'Prop') ||
				(expression.type === 'Identifier' && expression.name === 'Prop')
			);
		};

		return {
			PropertyDefinition(node) {
				if (!node.decorators?.some(isPropDecorator)) {
					return;
				}
				if (node.key.type !== 'Identifier' || !node.key.name.startsWith('_')) {
					return;
				}
				if (node.optional === true && (node.value === null || node.value === undefined)) {
					context.report({ node, messageId: 'optionalMissingValue', data: { name: node.key.name } });
				}
			},
		};
	},
};

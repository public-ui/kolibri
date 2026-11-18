/**
 * @fileoverview ESLint rule: a required `@Prop` carries no initializer.
 *
 * The initializer of a `@Prop` field is the documented default (custom-elements.json, adapter
 * IntelliSense). A required prop must not have one — the documentation has to say that a value
 * must be provided. The stable internal state comes from the component's props config
 * (ARC42 §4, #11435), never from the initializer.
 *
 * ❌ @Prop() public _label!: LabelPropType = 'Label';
 * ✅ @Prop() public _label!: LabelPropType;
 */

/** @type {import('eslint').Rule.RuleModule} */
export default {
	meta: {
		type: 'problem',
		docs: {
			description: 'A required @Prop must not have an initializer — the documentation has to say that a value must be provided',
		},
		schema: [],
		messages: {
			requiredHasValue: "'{{name}}' is required — a required @Prop must not have an initializer. The documentation has to say that a value must be provided.",
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
				if (node.definite === true && node.value !== null && node.value !== undefined) {
					context.report({ node, messageId: 'requiredHasValue', data: { name: node.key.name } });
				}
			},
		};
	},
};

/**
 * @fileoverview ESLint rule: every decorator stands on a line of its own, above the code it decorates.
 *
 * Applies to the decorators of classes and class members (`@Component`, `@Element`, `@Prop`,
 * `@State`, `@Event`, `@Method`, `@Listen`, `@Watch`, …). Prettier keeps either placement, so the
 * rule is the only place that makes it uniform. The fix breaks the line after the decorator and
 * indents the code like the decorator.
 *
 * ❌ @Prop() public _label!: LabelPropType;
 * ✅ @Prop()
 *    public _label!: LabelPropType;
 */

/** @type {import('eslint').Rule.RuleModule} */
export default {
	meta: {
		type: 'layout',
		fixable: 'whitespace',
		docs: {
			description: 'Every decorator stands on a line of its own, above the code it decorates',
		},
		schema: [],
		messages: {
			sameLine: "'@{{name}}' shares its line with the code that follows it. Put the decorator on a line of its own.",
		},
	},

	create(context) {
		const sourceCode = context.sourceCode;

		const decoratorName = (decorator) => {
			const expression = decorator.expression.type === 'CallExpression' ? decorator.expression.callee : decorator.expression;
			return sourceCode.getText(expression);
		};

		const check = (node) => {
			for (const decorator of node.decorators ?? []) {
				const next = sourceCode.getTokenAfter(decorator, { includeComments: true });
				if (!next || next.loc.start.line !== decorator.loc.end.line) {
					continue;
				}
				const indentation = sourceCode.lines[decorator.loc.start.line - 1].slice(0, decorator.loc.start.column);
				context.report({
					node: decorator,
					messageId: 'sameLine',
					data: { name: decoratorName(decorator) },
					fix: (fixer) => fixer.replaceTextRange([decorator.range[1], next.range[0]], `\n${indentation}`),
				});
			}
		};

		return {
			AccessorProperty: check,
			ClassDeclaration: check,
			ClassExpression: check,
			MethodDefinition: check,
			PropertyDefinition: check,
			TSAbstractMethodDefinition: check,
			TSAbstractPropertyDefinition: check,
		};
	},
};

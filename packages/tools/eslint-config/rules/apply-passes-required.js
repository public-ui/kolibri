/**
 * @fileoverview ESLint rule enforcing that component watchers pass the config-slot
 * requiredness to `PropDefinition.apply`.
 *
 * Requiredness is a property of the component, answered by `BaseWebComponent.isRequired(key)`
 * from the `required` array of the component's props config (ARC42 §4, "Undefined handling,
 * requiredness and the default contract"). An `apply` call in a web component that omits the
 * third argument silently disables the required warning for that component — the rule makes
 * the omission visible.
 *
 * Applies to the prop definitions whose requiredness is config-driven. Appliers outside a
 * component config (items, behaviors, `resolve-props`) deliberately apply without the
 * argument: an unset value there is a legitimate "not set", so the rule is scoped to the
 * web component layer by the ESLint configuration.
 *
 * ❌ labelProp.apply(value, (v) => this.setRenderProp('label', v));
 * ✅ labelProp.apply(value, (v) => this.setRenderProp('label', v), this.isRequired('label'));
 *
 * Example configuration:
 *
 * ```js
 * 'kolibri/apply-passes-required': ['error', { definitions: ['labelProp', 'hrefProp'] }]
 * ```
 */

/** @type {import('eslint').Rule.RuleModule} */
export default {
	meta: {
		type: 'problem',
		docs: {
			description: 'Require web component appliers to pass this.isRequired(key) to PropDefinition.apply',
		},
		schema: [
			{
				type: 'object',
				properties: {
					definitions: {
						type: 'array',
						items: { type: 'string' },
						description: 'Prop definition identifiers the rule watches (defaults to the label family and hrefProp).',
					},
				},
				additionalProperties: false,
			},
		],
		messages: {
			requiredMissing:
				"'{{name}}.apply' must pass 'this.isRequired(\"<key>\")' as its third argument — without it the required warning of the component's props config is silently disabled.",
		},
	},

	create(context) {
		const definitions = new Set(context.options[0]?.definitions ?? ['labelProp', 'labelWithExpertSlotProp', 'hrefProp']);

		return {
			CallExpression(node) {
				const callee = node.callee;
				if (callee.type !== 'MemberExpression' || callee.computed || callee.property.type !== 'Identifier' || callee.property.name !== 'apply') {
					return;
				}
				const object = callee.object;
				if (object.type !== 'Identifier' || !definitions.has(object.name)) {
					return;
				}
				const third = node.arguments[2];
				const passesRequired =
					third?.type === 'CallExpression' &&
					third.callee.type === 'MemberExpression' &&
					third.callee.object.type === 'ThisExpression' &&
					third.callee.property.type === 'Identifier' &&
					third.callee.property.name === 'isRequired';
				if (!passesRequired) {
					context.report({ node: callee, messageId: 'requiredMissing', data: { name: object.name } });
				}
			},
		};
	},
};

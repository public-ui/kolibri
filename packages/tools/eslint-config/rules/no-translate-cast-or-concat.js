/**
 * @fileoverview ESLint rule enforcing that every `translate()` call uses a plain
 * string literal as its first argument.
 *
 * KoliBri's i18n contract requires keys to be statically resolvable so that the
 * i18n linter (scripts/lint-i18n.ts) can verify every used key exists in the
 * locale files and the KeyEnum. Dynamically constructed keys defeat that check.
 *
 * The rule forbids, as the first argument of `translate(...)`:
 *   - casts:                 translate('kol-foo' as TranslationKey)
 *   - template literals:     translate(`kol-${dynamic}`)
 *   - binary expressions:    translate('kol-' + dynamic)
 *   - identifiers/variables: translate(someVar)
 *   - ternaries:             translate(cond ? 'a' : 'b')
 *   - call expressions:      translate(getKey())
 *
 * Only a plain string literal is allowed:
 *   ✅ translate('kol-foo')
 *   ✅ translate('kol-foo', { placeholders: { ... } })
 *
 * The rule also flags any `as TranslationKey` cast expression anywhere in a
 * file (even outside `translate()`), because such casts only exist to silence
 * the type checker for dynamically built keys — there is no legitimate reason
 * to write them under the full-key rule.
 *
 * Example configuration:
 *
 * ```js
 * 'kolibri/no-translate-cast-or-concat': 'error'
 * ```
 */

/** @type {import('eslint').Rule.RuleModule} */
export default {
	meta: {
		type: 'problem',
		docs: {
			description: 'Require translate() to be called with a plain string literal and forbid `as TranslationKey` casts',
		},
		schema: [],
		messages: {
			plainLiteralRequired:
				"translate() must be called with a plain string literal (translate('kol-...')). Dynamic keys, casts, template literals and variables are forbidden.",
			keyCastForbidden: 'Casting with `as {{castText}}` is forbidden. Write the full key as a plain string literal instead.',
		},
	},

	create(context) {
		// Only `TranslationKey` (the i18n key type from src/i18n.ts) is relevant.
		// Matching every `*Key` would produce false positives on legitimate casts
		// such as `event.key as KeyboardKey` or `value as KoliBriTableSelectionKey`.
		const KEY_CAST_REGEX = /\bTranslationKey$/;

		/**
		 * Determines whether a node is a plain string literal suitable as a
		 * translate() first argument. A Literal whose value is a string qualifies;
		 * everything else (template literals, identifiers, binary expressions,
		 * ternaries, casts, calls, …) does not.
		 */
		function isPlainStringLiteral(node) {
			return node !== null && node.type === 'Literal' && typeof node.value === 'string';
		}

		/**
		 * Walks up through TS `as`/type-assertion wrappers and returns the inner
		 * expression. ESLint sees TypeScript assertions via the
		 * `TSAsExpression` (and legacy `<T>expr`) node types when the
		 * @typescript-eslint/parser is used.
		 */
		function unwrapTSAs(node) {
			let current = node;
			while (current && (current.type === 'TSAsExpression' || current.type === 'TSTypeAssertion')) {
				current = current.expression;
			}
			return current;
		}

		return {
			// Catch `as ...Key` / `<...Key>x` casts anywhere in the file. They only
			// exist to mask dynamically built keys and have no legitimate use under
			// the full-key rule.
			TSAsExpression(node) {
				const typeText = context.sourceCode.getText(node.typeAnnotation);
				if (KEY_CAST_REGEX.test(typeText)) {
					context.report({
						node,
						messageId: 'keyCastForbidden',
						data: { castText: typeText },
					});
				}
			},
			TSTypeAssertion(node) {
				const typeText = context.sourceCode.getText(node.typeAnnotation);
				if (KEY_CAST_REGEX.test(typeText)) {
					context.report({
						node,
						messageId: 'keyCastForbidden',
						data: { castText: typeText },
					});
				}
			},

			// Validate translate() call sites.
			CallExpression(node) {
				const callee = node.callee;

				// Match `translate(...)` (identifier) — ignore method calls like
				// `i18n.translate(...)` (MemberExpression), which are the runtime
				// service, not the helper authors use.
				if (callee.type !== 'Identifier' || callee.name !== 'translate') {
					return;
				}

				if (node.arguments.length === 0) {
					return; // malformed, but not this rule's concern
				}

				const firstArg = node.arguments[0];

				// If the raw argument is a cast (`x as ...Key`), the TSAsExpression
				// visitor already reports it. Still reject here when the inner value
				// is not a plain string literal (e.g. template literal inside a cast).
				const inner = unwrapTSAs(firstArg);
				if (!isPlainStringLiteral(inner)) {
					context.report({
						node: firstArg,
						messageId: 'plainLiteralRequired',
					});
				}
			},
		};
	},
};

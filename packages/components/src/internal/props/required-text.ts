import type { Stringified } from '../../schema';
import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

/**
 * Required-text prop of the form: whether the mandatory-fields hint is shown, and optionally the
 * text that replaces the default hint.
 *
 * External type is `Stringified<boolean>` (the declared `@Prop` type), internal type is
 * `boolean | string` — the predecessor branched on `typeof value === 'boolean'` and ran
 * `watchBoolean` or `watchString`, so a string was stored verbatim and rendered as the hint text.
 * A string is therefore **not** parsed into a boolean: `_requiredText="true"` renders the literal
 * word, exactly as before.
 */
export type RequiredTextProp = Prop<'requiredText', Stringified<boolean>, boolean | string>;

function normalizeRequiredText(value: unknown): boolean | string {
	if (typeof value === 'boolean' || typeof value === 'string') {
		return value;
	}
	throw new Error(`Invalid requiredText: expected boolean or string, got ${typeof value}`);
}

export const requiredTextProp = createPropDefinition<RequiredTextProp>('requiredText', true, normalizeRequiredText);

import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

/**
 * The internal type uses the sentinel `''` for "not set" because the prop-definition factory
 * requires a non-undefined default value (same pattern as `linkRoleProp`). A plain link must
 * not render `aria-expanded="false"` — assistive technologies would announce a collapsed
 * state that the link does not actually manage.
 */
export type AriaExpandedProp = Prop<'ariaExpanded', boolean | undefined, 'true' | 'false' | ''>;

/**
 * Normalizes the value to the aria-expanded tokens.
 *
 * Booleans and their string equivalents map to `'true'`/`'false'`; the empty string means "not
 * set" and yields the sentinel. Anything else throws, so the factory logs a `devWarning` and
 * keeps the previous value instead of degrading silently. undefined/null are handled by the
 * factory's `apply` before this is reached.
 */
function normalizeAriaExpanded(value: unknown): 'true' | 'false' | '' {
	if (value === true || value === 'true') {
		return 'true';
	}
	if (value === false || value === 'false') {
		return 'false';
	}
	if (value === '') {
		return '';
	}
	throw new Error(`Invalid aria-expanded value: expected a boolean, got ${JSON.stringify(value)}`);
}

export const ariaExpandedProp = createPropDefinition<AriaExpandedProp>('ariaExpanded', '', normalizeAriaExpanded);

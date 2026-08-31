import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

/**
 * The internal type uses the sentinel `''` for "not set" because the prop-definition factory
 * requires a non-undefined default value (same pattern as {@link ariaExpandedProp}). A button
 * that is not part of a selectable set must not render `aria-selected="false"` — screen readers
 * would announce a selection state the button does not have.
 */
export type AriaSelectedProp = Prop<'ariaSelected', boolean | undefined, 'true' | 'false' | ''>;

/**
 * Normalizes the value to the aria-selected tokens.
 *
 * Booleans and their string equivalents map to `'true'`/`'false'`; anything else degrades to the
 * sentinel `''` so the attribute is omitted. undefined/null are handled by the factory's `apply`
 * before this is reached.
 */
function normalizeAriaSelected(value: unknown): 'true' | 'false' | '' {
	if (value === true || value === 'true') {
		return 'true';
	}
	if (value === false || value === 'false') {
		return 'false';
	}
	return '';
}

export const ariaSelectedProp = createPropDefinition<AriaSelectedProp>('ariaSelected', '', normalizeAriaSelected);

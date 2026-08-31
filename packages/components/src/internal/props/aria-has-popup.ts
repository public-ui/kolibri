import type { AriaHasPopupPropType } from '../../schema/props/aria-has-popup';
import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

const ARIA_HAS_POPUP_OPTIONS: readonly AriaHasPopupPropType[] = ['dialog', 'false', 'grid', 'listbox', 'menu', 'tree', 'true'];

/**
 * The internal type uses the sentinel `''` for "not set" because the prop-definition factory
 * requires a non-undefined default value (same pattern as {@link ariaExpandedProp}). An element
 * that opens nothing must not render `aria-haspopup="false"` either — the attribute is omitted
 * entirely, which is what assistive technologies expect for a plain button.
 */
export type AriaHasPopupProp = Prop<'ariaHasPopup', AriaHasPopupPropType | undefined, AriaHasPopupPropType | ''>;

/**
 * Normalizes the value to one of the aria-haspopup tokens.
 *
 * Anything that is not a known token degrades to the sentinel `''` so the attribute is omitted.
 * undefined/null are handled by the factory's `apply` before this is reached.
 */
function normalizeAriaHasPopup(value: unknown): AriaHasPopupPropType | '' {
	return typeof value === 'string' && (ARIA_HAS_POPUP_OPTIONS as readonly string[]).includes(value) ? (value as AriaHasPopupPropType) : '';
}

export const ariaHasPopupProp = createPropDefinition<AriaHasPopupProp>('ariaHasPopup', '', normalizeAriaHasPopup);

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
 * The empty string means "not set" and yields the sentinel. Any other unknown value throws, so
 * the factory logs a `devWarning` and keeps the previous value instead of degrading silently.
 * undefined/null are handled by the factory's `apply` before this is reached.
 */
function normalizeAriaHasPopup(value: unknown): AriaHasPopupPropType | '' {
	if (value === '') {
		return '';
	}
	if (typeof value === 'string' && (ARIA_HAS_POPUP_OPTIONS as readonly string[]).includes(value)) {
		return value as AriaHasPopupPropType;
	}
	throw new Error(`Invalid aria-haspopup value: expected one of ${ARIA_HAS_POPUP_OPTIONS.join(', ')}, got ${JSON.stringify(value)}`);
}

export const ariaHasPopupProp = createPropDefinition<AriaHasPopupProp>('ariaHasPopup', '', normalizeAriaHasPopup);

import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * The allowed values for the aria-current attribute.
 * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current
 */
export const ARIA_CURRENT_VALUE_OPTIONS = ['date', 'location', 'page', 'step', 'time', 'true', 'false'] as const;
export type AriaCurrentValuePropType = (typeof ARIA_CURRENT_VALUE_OPTIONS)[number];

export type AriaCurrentValueProp = SimpleProp<'ariaCurrentValue', AriaCurrentValuePropType>;

/**
 * Normalizes the value to a valid aria-current value.
 *
 * Graceful degradation: when the (already normalized, non-null) string is not one of the
 * allowed options, falls back to the default `'page'` instead of throwing. The factory's
 * `apply` handles undefined/null before this is reached.
 */
function normalizeAriaCurrentValue(value: unknown): AriaCurrentValuePropType {
	const str = normalizeString(value);
	return (ARIA_CURRENT_VALUE_OPTIONS as readonly string[]).includes(str) ? (str as AriaCurrentValuePropType) : 'page';
}

export const ariaCurrentValueProp = createPropDefinition<AriaCurrentValueProp>('ariaCurrentValue', 'page', normalizeAriaCurrentValue);

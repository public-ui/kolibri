import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Label prop for kol-link.
 *
 * Accepts a string label or `false`. When `false`, the expert slot is enabled (the label is
 * rendered via the slot instead of as a plain string). This differs from the generic
 * `labelWithExpertSlotProp` (which only accepts a string) so that link consumers can opt in
 * to the expert slot explicitly.
 */
export type LinkLabelProp = Prop<'label', string | false, string | false>;

/**
 * Normalizes the label value.
 *
 * - `false` enables the expert slot and is returned as-is.
 * - Strings are returned as-is.
 * - Anything else is coerced via `normalizeString`.
 *
 * The factory's `apply` handles undefined/null (falling back to the default `''`) before this
 * is reached, so no null guard is needed here.
 */
function normalizeLinkLabel(value: unknown): string | false {
	if (value === false) {
		return false;
	}
	if (typeof value === 'string') {
		return value;
	}
	return normalizeString(value);
}

export const linkLabelProp = createPropDefinition<LinkLabelProp>('label', '', normalizeLinkLabel);

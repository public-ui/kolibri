import type { LabelWithExpertSlotPropType } from '../../schema/props/label';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeLabelSegments } from './helpers/normalizers';
import { isValidLabelWithExpertSlot } from './helpers/validators';
import { labelHints } from './hints/label-hints';

/**
 * Label prop for accessible names of components with an expert slot: the empty string enables the
 * expert slot, segments in different languages let screen readers pronounce every language run.
 *
 * Usage (according to WCAG 2.1 and WAI-ARIA):
 * - Every interactive element must have a perceivable label (WCAG 4.1.2 Name, Role, Value)
 * - Labels must be descriptive and concise (WCAG 2.4.6 Headings and Labels)
 * - Labels must be programmatically associated with their controls (WCAG 1.3.1 Info and Relationships)
 * - Minimum 2 characters for the joined text of the label (numbers-only labels are exempt)
 * - Labels longer than 80 characters are accepted, but give a UI/UX hint to keep them concise
 * - `undefined` is the "not set" state, when the accessible name is provided differently
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html
 * @see https://www.w3.org/WAI/WCAG21/Understanding/headings-and-labels.html
 * @see https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html
 * @see https://www.w3.org/TR/accname-1.2/
 */
export type LabelWithExpertSlotProp = SimpleProp<'label', LabelWithExpertSlotPropType>;
export const labelWithExpertSlotProp = createPropDefinition<LabelWithExpertSlotProp>('label', '', normalizeLabelSegments, isValidLabelWithExpertSlot, {
	hints: labelHints,
});

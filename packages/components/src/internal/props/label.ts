import type { LabelPropType } from '../../schema/props/label';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';
import { isValidLabel } from './helpers/validators';
import { labelHints } from './hints/label-hints';

/**
 * Label prop for accessible names
 *
 * Description:
 * The label provides the accessible name for a component. It is announced by screen readers
 * and is essential for users who rely on assistive technology to understand the purpose of
 * interactive elements.
 *
 * Usage (according to WCAG 2.1 and WAI-ARIA):
 * - Every interactive element must have a perceivable label (WCAG 4.1.2 Name, Role, Value)
 * - Labels must be descriptive and concise (WCAG 2.4.6 Headings and Labels)
 * - Labels must be programmatically associated with their controls (WCAG 1.3.1 Info and Relationships)
 * - Minimum 2 characters for meaningful labels; an explicitly passed empty string is invalid
 *   (the empty string is reserved for the label with expert slot)
 * - Labels longer than 80 characters are accepted, but give a UI/UX hint to keep them concise
 * - `undefined` is the "not set" state, when the accessible name is provided differently
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html
 * @see https://www.w3.org/WAI/WCAG21/Understanding/headings-and-labels.html
 * @see https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html
 * @see https://www.w3.org/TR/accname-1.2/
 */
export type LabelProp = SimpleProp<'label', LabelPropType>;
export const labelProp = createPropDefinition<LabelProp>('label', undefined as unknown as LabelPropType, normalizeString, isValidLabel, {
	required: true,
	hints: labelHints,
});

/**
 * The label of a component whose `_label` is optional: same validation and hints as `labelProp`,
 * but an unset label is legitimate (a missing caption or landmark name) and does not warn.
 * The `hrefProp`/`optionalHrefProp` pair is the precedent.
 */
export type OptionalLabelProp = SimpleProp<'label', LabelPropType>;
export const optionalLabelProp = createPropDefinition<OptionalLabelProp>('label', undefined as unknown as LabelPropType, normalizeString, isValidLabel, {
	hints: labelHints,
});

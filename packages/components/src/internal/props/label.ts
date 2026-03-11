import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

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
 * - Minimum 2 characters, maximum 80 characters for meaningful, concise labels
 * - An empty label ("") is allowed for cases where the accessible name is provided differently
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html
 * @see https://www.w3.org/WAI/WCAG21/Understanding/headings-and-labels.html
 * @see https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html
 * @see https://www.w3.org/TR/accname-1.2/
 */
export type LabelProp = SimpleProp<'label', string>;
export const labelProp = createPropDefinition<LabelProp>('label', '', normalizeString, (v) => v === '' || (v.length >= 2 && v.length <= 80));

import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeNumber } from './helpers/normalizers';

/**
 * Value prop for numeric progress or meter values
 *
 * Description:
 * Represents the current numeric value of a progress indicator or meter. The value must be
 * a non-negative number and is used together with max to calculate the completion percentage.
 *
 * Usage (according to W3C HTML specification and WAI-ARIA):
 * - Must be a number ≥ 0
 * - Corresponds to the HTML <progress> element's value attribute
 * - Maps to aria-valuenow in WAI-ARIA for assistive technology communication
 * - Screen readers announce the current value as part of the progress status
 *
 * Accessibility:
 * - The value must be programmatically determinable (WCAG 1.3.1 Info and Relationships)
 * - Dynamic value changes should be announced to screen readers (WCAG 4.1.3 Status Messages)
 * - Use aria-valuetext for human-readable progress descriptions when the numeric value alone is insufficient
 *
 * @see https://html.spec.whatwg.org/multipage/form-elements.html#attr-progress-value
 * @see https://www.w3.org/TR/wai-aria-1.2/#aria-valuenow
 * @see https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html
 */
export type NumberValueProp = SimpleProp<'value', number>;
export const numberValueProp = createPropDefinition<NumberValueProp>('value', 0, normalizeNumber, (v) => v >= 0);

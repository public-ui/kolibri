import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeNumber } from './helpers/normalizers';

/**
 * Max prop for upper boundary of progress and meter elements
 *
 * Description:
 * The max attribute defines the upper bound of a range. It is used by progress bars and
 * meter elements to indicate the total or maximum achievable value.
 *
 * Usage (according to W3C HTML specification and WAI-ARIA):
 * - Must be a positive number greater than 0
 * - Corresponds to the HTML progress element's max attribute
 * - Maps to aria-valuemax in WAI-ARIA to communicate the upper limit to assistive technologies
 * - Default value is 100 (representing 100%)
 *
 * Accessibility:
 * - Screen readers use aria-valuemax together with aria-valuenow to announce progress status
 * - The relationship between value and max must be programmatically determinable (WCAG 1.3.1 Info and Relationships)
 *
 * @see https://html.spec.whatwg.org/multipage/form-elements.html#attr-progress-max
 * @see https://www.w3.org/TR/wai-aria-1.2/#aria-valuemax
 * @see https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html
 */
export type MaxProp = SimpleProp<'max', number>;
export const maxProp = createPropDefinition<MaxProp>('max', 100, normalizeNumber, (v) => v > 0);

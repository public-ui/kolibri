import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

/**
 * Hide Label prop for controlling label visibility
 *
 * Description:
 * Specifies whether the label should be visually hidden.
 * When enabled, the label is not displayed but remains accessible to screen readers.
 *
 * Usage (according to WCAG 2.1 and WAI-ARIA):
 * - Default: false (label is visible)
 * - When true: label is hidden visually but remains available to assistive technologies (WCAG 1.3.1)
 * - The label content is still used for accessibility purposes
 * - Expert slot becomes visible when label is hidden
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html
 * @see https://www.a11yproject.com/posts/how-to-hide-content/
 */
export type HideLabelProp = SimpleProp<'hideLabel', boolean>;
export const hideLabelProp = createPropDefinition<HideLabelProp>('hideLabel', false, normalizeBoolean);

import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Icons prop for icon class names
 *
 * Description:
 * Specifies the icon(s) to display via CSS class names (e.g., icon fonts). Icons are
 * visual indicators that supplement or replace text content.
 *
 * Usage (according to WCAG 2.1 and WAI-ARIA):
 * - Decorative icons: Must be hidden from assistive technologies (aria-hidden="true")
 * - Informative icons: Must have a text alternative (WCAG 1.1.1 Non-text Content)
 *   - Use the label prop or aria-label to provide an accessible name
 * - Icons must not be the sole means of conveying information (WCAG 1.3.3 Sensory Characteristics)
 * - Icon colors must have sufficient contrast against their background (WCAG 1.4.11 Non-text Contrast, 3:1 ratio)
 * - Icons used in interactive elements must meet minimum target size (WCAG 2.5.8 Target Size)
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html
 * @see https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html
 * @see https://www.w3.org/WAI/WCAG21/Understanding/sensory-characteristics.html
 * @see https://www.w3.org/TR/wai-aria-1.2/#aria-hidden
 */
export type IconsProp = SimpleProp<'icons', string>;
export const iconsProp = createPropDefinition<IconsProp>('icons', 'kolicon-logo', normalizeString);

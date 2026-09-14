import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

/**
 * Has-closer prop for dismissible components
 *
 * Description:
 * Controls whether the component renders a closer button that dismisses it.
 *
 * Usage (according to WCAG 2.1 and WAI-ARIA):
 * - The closer must be operable by keyboard and reach the minimum target size (WCAG 2.5.5 Target Size)
 * - Dismissing must remove the content from the accessibility tree, not just hide it visually
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
 */
export type HasCloserProp = SimpleProp<'hasCloser', boolean>;
export const hasCloserProp = createPropDefinition<HasCloserProp>('hasCloser', false, normalizeBoolean);

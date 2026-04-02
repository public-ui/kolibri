import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

/**
 * Inline prop for controlling component layout behavior
 *
 * Description:
 * Defines whether the component is displayed as a standalone block or inline
 * without enforcing a minimum size of 44px.
 *
 * Usage (according to WCAG 2.1):
 * - Default: false (standalone block with minimum target size)
 * - When true: inline display without minimum size enforcement
 * - Be cautious with inline mode to maintain WCAG 2.5.8 Target Size (minimum 44x44px)
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
 */
export type InlineProp = SimpleProp<'inline', boolean>;
export const inlineProp = createPropDefinition<InlineProp>('inline', false, normalizeBoolean);

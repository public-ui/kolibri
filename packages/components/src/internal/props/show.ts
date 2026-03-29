import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

/**
 * Show prop for toggling element visibility
 *
 * Description:
 * Controls whether a component is visible or hidden. The visibility state must be
 * communicated to assistive technologies so screen reader users understand which
 * content is currently perceivable.
 *
 * Usage (according to WCAG 2.1 and WAI-ARIA):
 * - Hidden content must be correctly excluded from the accessibility tree (aria-hidden)
 * - Toggling visibility should update aria-expanded on the controlling element (WCAG 4.1.2 Name, Role, Value)
 * - Content that appears or disappears must not trap keyboard focus (WCAG 2.1.2 No Keyboard Trap)
 * - Dynamic content changes should be announced to screen readers when appropriate (WCAG 4.1.3 Status Messages)
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html
 * @see https://www.w3.org/TR/wai-aria-1.2/#aria-hidden
 * @see https://www.w3.org/TR/wai-aria-1.2/#aria-expanded
 * @see https://www.w3.org/WAI/WCAG21/Understanding/no-keyboard-trap.html
 */
export type ShowProp = SimpleProp<'show', boolean>;
export const showProp = createPropDefinition<ShowProp>('show', false, normalizeBoolean);

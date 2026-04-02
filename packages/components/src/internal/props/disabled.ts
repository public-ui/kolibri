import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

/**
 * Disabled prop for controlling element interactivity
 *
 * Description:
 * Makes the element not focusable and ignore all events.
 * When enabled, the element cannot be interacted with via mouse, keyboard or programmatically.
 *
 * Usage (according to WCAG 2.1 and WAI-ARIA):
 * - Default: false (element is interactive)
 * - When true: element is disabled (WCAG 3.2.1 On Focus)
 * - Disabled elements should have sufficient visual indication (WCAG 1.4.3 Contrast Minimum)
 * - Consider using aria-disabled for better screen reader support
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/on-focus.html
 * @see https://www.w3.org/TR/wai-aria-1.2/#aria-disabled
 */
export type DisabledProp = SimpleProp<'disabled', boolean>;
export const disabledProp = createPropDefinition<DisabledProp>('disabled', false, normalizeBoolean);

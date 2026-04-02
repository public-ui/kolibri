import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

/**
 * Disabled prop
 *
 * Makes the element not focusable and causes it to ignore all events.
 *
 * Usage (according to WCAG 2.1):
 * - Default: false (element is enabled)
 * - When true: element becomes non-interactive (WCAG 4.1.2)
 * - Consider using aria-disabled instead when you need the element to remain keyboard-accessible
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html
 */
export type DisabledProp = SimpleProp<'disabled', boolean>;

export const disabledProp = createPropDefinition<DisabledProp>('disabled', false, normalizeBoolean);

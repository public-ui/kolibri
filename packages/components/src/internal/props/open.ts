import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

/**
 * Open prop for expandable/collapsible components
 *
 * Description:
 * Controls whether an expandable element (details, accordion, …) is currently open. The open
 * state must be exposed to assistive technologies through aria-expanded on the toggle element
 * and aria-hidden on the collapsible content.
 *
 * Usage (according to WCAG 2.1 and WAI-ARIA):
 * - The toggle element must reflect the current state via aria-expanded (WCAG 4.1.2 Name, Role, Value)
 * - Hidden content must be excluded from the accessibility tree (aria-hidden)
 * - Closing content must not trap keyboard focus (WCAG 2.1.2 No Keyboard Trap)
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html
 * @see https://www.w3.org/TR/wai-aria-1.2/#aria-expanded
 * @see https://www.w3.org/TR/wai-aria-1.2/#aria-hidden
 */
export type OpenProp = SimpleProp<'open', boolean>;
export const openProp = createPropDefinition<OpenProp>('open', false, normalizeBoolean);

import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

/**
 * Alert prop for live announcements
 *
 * Description:
 * Controls whether the alert is exposed to assistive technologies as a live region
 * (`role="alert"`), so screen readers announce the message without moving the focus.
 *
 * Usage (according to WCAG 2.1 and WAI-ARIA):
 * - Status messages must be announced without receiving focus (WCAG 4.1.3 Status Messages)
 * - `role="alert"` implies an assertive live region; use it sparingly for time-critical information
 * - The role is removed automatically after a timeout so a recurring value change is announced again
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html
 * @see https://www.w3.org/TR/wai-aria-1.2/#alert
 */
export type AlertProp = SimpleProp<'alert', boolean>;
export const alertProp = createPropDefinition<AlertProp>('alert', false, normalizeBoolean);

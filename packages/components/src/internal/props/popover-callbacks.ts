import type { PopoverCallbacksPropType } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

/**
 * PopoverCallbacks prop for popover event callbacks
 *
 * Description:
 * Allows consumers to register callback functions for popover lifecycle events such as
 * onClose. These callbacks are invoked when the corresponding event occurs.
 *
 * Usage (according to WCAG 2.1 and WAI-ARIA):
 * - The onClose callback should handle focus management when the popover closes (WCAG 2.4.3 Focus Order)
 * - Screen reader users must be informed of popover state changes (WCAG 4.1.3 Status Messages)
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html
 */
export type PopoverCallbacksProp = SimpleProp<'on', PopoverCallbacksPropType>;
export const popoverCallbacksProp = createPropDefinition<PopoverCallbacksProp>('on', {}, (value) => {
	if (typeof value === 'object' && value !== null) {
		return value as PopoverCallbacksPropType;
	}
	throw new Error(`Invalid popover callbacks: ${JSON.stringify(value)}`);
});

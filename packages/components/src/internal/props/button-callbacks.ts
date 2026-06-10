import type { ButtonCallbacksPropType, StencilUnknown } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

/**
 * Button Callbacks prop for event callback functions
 *
 * Description:
 * Defines the callback functions for button events (onClick, onMouseDown, onFocus, onBlur).
 * The callbacks are invoked by the controller; the web component layer only dispatches
 * the corresponding DOM events.
 *
 * Default: empty object (no callbacks)
 *
 * @deprecated Consumers should prefer native event listeners; the prop is kept for API compatibility.
 */
export type ButtonCallbacksProp = SimpleProp<'on', ButtonCallbacksPropType<StencilUnknown>>;

export const buttonCallbacksProp = createPropDefinition<ButtonCallbacksProp>('on', {}, (value) => {
	if (value === undefined || value === null) {
		return {};
	}
	if (typeof value === 'object') {
		return value as ButtonCallbacksPropType<StencilUnknown>;
	}
	throw new Error('Invalid button callbacks');
});

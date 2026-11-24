import type { Callback } from '../enums';
import type { EventCallback, EventValueOrEventCallback } from '../types/callbacks';

/* types */
export type ButtonCallbacksPropType<T> = {
	[Callback.onClick]?: EventValueOrEventCallback<MouseEvent, T>;
	[Callback.onMouseDown]?: EventCallback<MouseEvent>;
	[Callback.onFocus]?: EventCallback<FocusEvent>;
	[Callback.onBlur]?: EventCallback<FocusEvent>;
};

/**
 * Defines the callback functions for button events.
 */
export type PropButtonCallbacks<T> = {
	on: ButtonCallbacksPropType<T>;
};

import { Events } from '../../enums/events';
import { EventCallback, EventValueOrEventCallback } from '../callbacks';
import type { Generic } from 'adopted-style-sheets';
import { watchValidator } from '../../utils/prop.validators';
import { StencilUnknown } from '../unknown';

/* types */
export type ButtonCallbacksPropType<T> = {
	[Events.onClick]?: EventValueOrEventCallback<MouseEvent, T>;
	[Events.onMouseDown]?: EventCallback<MouseEvent>;
};

/**
 * Defines the callback functions for button events.
 */
export type PropButtonCallbacks<T> = {
	on: ButtonCallbacksPropType<T>;
};

/* validator */
export const validateButtonCallbacks = (component: Generic.Element.Component, value?: ButtonCallbacksPropType<StencilUnknown>): void => {
	watchValidator(
		component,
		`_on`,
		(value) => typeof value === 'object' && value !== null,
		new Set(['ButtonCallbacksPropType {Events.onClick, Events.onMouseDown}']),
		value,
	);
};

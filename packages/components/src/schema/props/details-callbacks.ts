import type { Generic } from 'adopted-style-sheets';
import type { Events } from '../enums';
import type { EventValueOrEventCallback } from '../types/callbacks';
import { watchValidator } from '../utils';
import { isObject } from '../validators';

/* types */
export type DetailsCallbacksPropType<T> = {
	[Events.onToggle]?: EventValueOrEventCallback<MouseEvent, T>;
};

/**
 * Defines the callback functions for detail events.
 */
export type PropDetailsCallbacks<T> = {
	on: DetailsCallbacksPropType<T>;
};

/* validator */
export const validateDetailsCallbacks = (component: Generic.Element.Component, value?: DetailsCallbacksPropType<boolean>): void => {
	watchValidator(component, `_on`, (value) => isObject(value), new Set(['DetailsCallbacksPropType {Events.onToggle}']), value);
};

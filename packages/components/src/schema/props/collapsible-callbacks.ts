import type { Generic } from 'adopted-style-sheets';
import type { Events } from '../enums';
import type { EventValueOrEventCallback } from '../types/callbacks';
import { watchValidator } from '../utils';

/* types */
export type CollapsibleCallbacksPropType<T> = {
	[Events.onClick]?: EventValueOrEventCallback<MouseEvent, T>;
	[Events.onToggle]?: EventValueOrEventCallback<MouseEvent, T>;
};

/**
 * Defines the callback functions for collapsible events.
 */
export type PropCollapsibleCallbacks<T> = {
	on: CollapsibleCallbacksPropType<T>;
};

/* validator */
export const validateCollapsibleCallbacks = (component: Generic.Element.Component, value?: CollapsibleCallbacksPropType<boolean>): void => {
	watchValidator(
		component,
		`_on`,
		(value) => typeof value === 'object' && value !== null,
		new Set(['CollapsibleCallbacksPropType {Events.onClick, Events.onToggle}']),
		value,
	);
};

import type { Generic } from 'adopted-style-sheets';
import type { Events } from '../enums';
import type { EventValueOrEventCallback } from '../types/callbacks';
import { watchValidator } from '../utils';
import { isObject } from '../validators';

/* types */
export type AccordionCallbacksPropType<T> = {
	[Events.onClick]?: EventValueOrEventCallback<MouseEvent, T>;
};

/**
 * Defines the callback functions for accordion events.
 */
export type PropAccordionCallbacks<T> = {
	on: AccordionCallbacksPropType<T>;
};

/* validator */
export const validateAccordionCallbacks = (component: Generic.Element.Component, value?: AccordionCallbacksPropType<boolean>): void => {
	watchValidator(component, `_on`, (value) => isObject(value), new Set(['AccordionCallbacksPropType {Events.onClick}']), value);
};

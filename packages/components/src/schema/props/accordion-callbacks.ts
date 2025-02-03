import type { Generic } from 'adopted-style-sheets';
import type { Callback } from '../enums';
import type { EventValueOrEventCallback } from '../types/callbacks';
import { watchValidator } from '../utils';

/* types */
export type AccordionCallbacksPropType<T> = {
	[Callback.onClick]?: EventValueOrEventCallback<MouseEvent, T>;
};

/**
 * Defines the callback functions for accordion events.
 */
export type PropAccordionCallbacks<T> = {
	on: AccordionCallbacksPropType<T>;
};

/* validator */
export const validateAccordionCallbacks = (component: Generic.Element.Component, value?: AccordionCallbacksPropType<boolean>): void => {
	watchValidator(component, `_on`, (value) => typeof value === 'object' && value !== null, new Set(['AccordionCallbacksPropType {Events.onClick}']), value);
};

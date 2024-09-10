import type { Generic } from 'adopted-style-sheets';
import type { Events } from '../enums';
import type { EventCallback } from '../types/callbacks';
import { watchValidator } from '../utils';

/* types */
export type PopoverCallbacksPropType = {
	[Events.onClose]?: EventCallback<MouseEvent | KeyboardEvent>;
};

/**
 * Defines the callback functions for popover events.
 */
export type PropPopoverCallbacks = {
	on: PopoverCallbacksPropType;
};

/* validator */
export const validatePopoverCallbacks = (component: Generic.Element.Component, value?: PopoverCallbacksPropType): void => {
	watchValidator(component, `_on`, (value) => typeof value === 'object' && value !== null, new Set(['PopoverCallbacksPropType {Events.onClose}']), value);
};

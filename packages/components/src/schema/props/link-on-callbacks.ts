import type { Generic } from 'adopted-style-sheets';
import type { Events } from '../enums';
import type { EventValueOrEventCallback } from '../types/callbacks';

/* types */
export type LinkOnCallbacksPropType = {
	[Events.onClick]?: EventValueOrEventCallback<Event, string>;
};

/**
 * Defines the callback functions for links.
 */
export type PropLinkOnCallbacks = {
	on: LinkOnCallbacksPropType;
};

/* validator */
export const validateLinkCallbacks = (component: Generic.Element.Component, value?: LinkOnCallbacksPropType): void => {
	if (typeof value === 'object' && typeof value?.onClick === 'function') {
		component.state = {
			...component.state,
			_on: value,
		};
	}
};

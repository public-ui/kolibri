import { Generic } from '@a11y-ui/core';
import { Events } from '../../enums/events';
import { EventValueOrEventCallback } from '../callbacks';

/* types */
export type LinkCallbacksPropType = {
	[Events.onClick]?: EventValueOrEventCallback<Event, string>;
};

/**
 * Defines the callback functions for links.
 */
export type PropLinkCallbacks = {
	on: LinkCallbacksPropType;
};

/* validator */
export const validateLinkCallbacks = (component: Generic.Element.Component, value?: LinkCallbacksPropType): void => {
	if (typeof value === 'object' && typeof value?.onClick === 'function') {
		component.state = {
			...component.state,
			_on: value,
		};
	}
};

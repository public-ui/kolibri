import type { Callback } from '../enums';
import type { EventValueOrEventCallback } from '../types/callbacks';

/* types */
export type LinkOnCallbacksPropType = {
	[Callback.onClick]?: EventValueOrEventCallback<Event, string>;
};

/**
 * Defines the callback functions for links.
 */
export type PropLinkOnCallbacks = {
	on: LinkOnCallbacksPropType;
};

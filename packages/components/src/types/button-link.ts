import { Events } from '../enums/events';
import { EventValueOrEventCallback } from './callbacks';

/* LINK */

/**
 * @deprecated Link should not use the on-click event. Use a button instead.
 */
export type LinkOnCallbacks = {
	[Events.onClick]?: EventValueOrEventCallback<Event, string>;
};

/**
 * @deprecated Will be removed in next major release.
 */
export type LinkUseCase = 'text' | 'image' | 'nav';

import type { Callback } from '../enums';
import type { EventValueOrEventCallback } from '../types/callbacks';

/* types */

/**
 * Callback functions shared by the collapsible components (`kol-accordion`, `kol-details`).
 *
 * Both components expose the same toggle interaction — a heading button that expands and collapses
 * the content region — so they share one callback contract instead of two near-identical ones.
 */
export type CollapsibleCallbacksPropType<T> = {
	[Callback.onClick]?: EventValueOrEventCallback<MouseEvent, T>;
	[Callback.onToggle]?: EventValueOrEventCallback<MouseEvent, T>;
};

/**
 * Defines the callback functions for collapsible events.
 */
export type PropCollapsibleCallbacks<T> = {
	on: CollapsibleCallbacksPropType<T>;
};

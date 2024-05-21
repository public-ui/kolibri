import type { Events } from '../enums';
import type { EventValueOrEventCallback } from '../types/callbacks';
import { watchValidator } from '../utils';

import type { Generic } from 'adopted-style-sheets';
import type { KoliBriSortDirection } from '../types';

/* types */
export type SortEventPayload = {
	key: string;
	currentSortDirection: KoliBriSortDirection;
};

export type SelectionChangeEventPayload = string[];

export type TableCallbacksPropType = {
	[Events.onSort]?: EventValueOrEventCallback<MouseEvent, SortEventPayload>;
	[Events.onSelectionChange]?: EventValueOrEventCallback<Event, SelectionChangeEventPayload>;
};

/**
 * Defines the callback functions for table events.
 */
export type PropTableCallbacks = {
	on: TableCallbacksPropType;
};

/* validator */
export const validateTableCallbacks = (component: Generic.Element.Component, value?: TableCallbacksPropType): void => {
	watchValidator(
		component,
		`_on`,
		(value) => typeof value === 'object' && value !== null,
		new Set(['TableCallbacksPropType {Events.onSort, Events.onSelectionChange}']),
		value,
	);
};

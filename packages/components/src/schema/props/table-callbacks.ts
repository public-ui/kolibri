import type { Events } from '../enums';
import type { EventValueOrEventCallback } from '../types/callbacks';
import { watchValidator } from '../utils';

import type { Generic } from 'adopted-style-sheets';
import type { KoliBriSortDirection, KoliBriTableDataType } from '../types';

/* types */
export type SortEventPayload = {
	key: string;
	currentSortDirection: KoliBriSortDirection;
};

export type SelectionChangeEventPayload = string[] | string;
export type StatefulSelectionChangeEventPayload = KoliBriTableDataType[] | KoliBriTableDataType | null;

export type TableCallbacksPropType = {
	[Events.onSort]?: EventValueOrEventCallback<MouseEvent, SortEventPayload>;
	[Events.onSelectionChange]?: EventValueOrEventCallback<Event, SelectionChangeEventPayload>;
};
export type TableStatefulCallbacksPropType = {
	[Events.onSelectionChange]?: EventValueOrEventCallback<Event, StatefulSelectionChangeEventPayload>;
};
/**
 * Defines the callback functions for table events.
 */
export type PropTableCallbacks = {
	on: TableCallbacksPropType;
};

export type StatefulPropTableCallbacks = {
	on: TableStatefulCallbacksPropType;
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

export const validateTableStatefulCallbacks = (component: Generic.Element.Component, value?: TableStatefulCallbacksPropType): void => {
	watchValidator(
		component,
		`_on`,
		(value) => typeof value === 'object' && value !== null,
		new Set(['TableStatefulCallbacksPropType {Events.onSelectionChange}']),
		value,
	);
};

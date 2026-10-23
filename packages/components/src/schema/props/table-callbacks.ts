import type { Callback } from '../enums';
import type { EventValueOrEventCallback } from '../types/callbacks';
import { watchValidator } from '../utils';

import type { Generic } from 'adopted-style-sheets';
import type { KoliBriSortDirection, KoliBriTableDataType, KoliBriTableSelectionKeys } from '../types';
import type { TableHeaderCells } from './table-header-cells';

/* types */
export type SortEventPayload = {
	key: string;
	currentSortDirection: KoliBriSortDirection;
};

export type SelectionChangeEventPayload = KoliBriTableSelectionKeys;
export type StatefulSelectionChangeEventPayload = KoliBriTableDataType[] | null;
export type ChangeHeaderCellsEventPayload = TableHeaderCells;
export type SortChangeEventPayload = {
	header: TableHeaderCells;
	sortedData: KoliBriTableDataType[];
};

export type TableCallbacksPropType = {
	[Callback.onChangeHeaderCells]?: EventValueOrEventCallback<Event, ChangeHeaderCellsEventPayload>;
	[Callback.onSelectionChange]?: EventValueOrEventCallback<Event, SelectionChangeEventPayload>;
	[Callback.onSort]?: EventValueOrEventCallback<MouseEvent, SortEventPayload>;
	[Callback.onSortChange]?: EventValueOrEventCallback<Event, SortChangeEventPayload>;
};
export type TableStatefulCallbacksPropType = {
	[Callback.onSelectionChange]?: EventValueOrEventCallback<Event, StatefulSelectionChangeEventPayload>;
	[Callback.onSortChange]?: EventValueOrEventCallback<Event, SortChangeEventPayload>;
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
		new Set(['TableCallbacksPropType {Events.onSort, Events.onSelectionChange, Events.onChangeHeaderCells}']),
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

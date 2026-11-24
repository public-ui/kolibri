import type { Callback } from '../enums';
import type { KoliBriSortDirection, KoliBriTableDataType, KoliBriTableSelectionKeys } from '../types';
import type { EventValueOrEventCallback } from '../types/callbacks';
import type { TableHeaderCells } from './table-header-cells';

/* types */
export type SortEventPayload = {
	key: string;
	currentSortDirection: KoliBriSortDirection;
};

export type SelectionChangeEventPayload = KoliBriTableSelectionKeys;
export type StatefulSelectionChangeEventPayload = KoliBriTableDataType[] | null;
export type ChangeHeaderCellsEventPayload = TableHeaderCells;

export type TableCallbacksPropType = {
	[Callback.onSort]?: EventValueOrEventCallback<MouseEvent, SortEventPayload>;
	[Callback.onSelectionChange]?: EventValueOrEventCallback<Event, SelectionChangeEventPayload>;
	[Callback.onChangeHeaderCells]?: EventValueOrEventCallback<Event, ChangeHeaderCellsEventPayload>;
};
export type TableStatefulCallbacksPropType = {
	[Callback.onSelectionChange]?: EventValueOrEventCallback<Event, StatefulSelectionChangeEventPayload>;
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

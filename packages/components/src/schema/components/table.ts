import type { Generic } from 'adopted-style-sheets';

import type { PropHasSettingsMenu, PropLabel, PropTableData, PropTableDataFoot, PropTableSelection, StatefulPropTableCallbacks } from '../props';
import type { PropPaginationPosition } from '../props/pagination-position';
import type { KoliBriSortDirection, KoliBriTableDataType, KoliBriTableHeaderCell, KoliBriTableSelection, Stringified } from '../types';
import type { InternalButtonProps } from './button';
import type { LinkProps } from './link';
import type { KoliBriPaginationProps } from './pagination';

/**
 * Action column item type that can be either a button or a link.
 */
export type ActionColumnPropType =
	| ({
			type: 'button';
	  } & InternalButtonProps)
	| ({
			type: 'link';
	  } & LinkProps);

export type KoliBriTableSelectedHead = { key: string; label: string; sortDirection: KoliBriSortDirection };

export type KoliBriDataCompareFn = (a: KoliBriTableDataType, b: KoliBriTableDataType, sortDirection?: KoliBriSortDirection) => number;

export type DefaultHeaderCell = KoliBriTableHeaderCell & {
	type?: 'default';
	compareFn?: KoliBriDataCompareFn;
	sortDirection?: KoliBriSortDirection;
};

export type KoliBriTableHeaderCellWithLogic = DefaultHeaderCell | ActionColumnHeaderCell;

/**
 * Action column header cell that defines actions for each row.
 * The actions function receives the row data and returns an array of action items (buttons or links).
 */
export type ActionColumnHeaderCell = KoliBriTableHeaderCell & {
	type: 'action';
	actions: (row: KoliBriTableDataType) => ActionColumnPropType[];
};

export type KoliBriTableHeaders = {
	horizontal?: KoliBriTableHeaderCellWithLogic[][];
	vertical?: KoliBriTableHeaderCellWithLogic[][];
};

export type KoliBriTablePaginationProps = Generic.Element.Members<
	{
		page: number;
	},
	KoliBriPaginationProps
>;
type KoliBriTablePaginationStates = Generic.Element.Members<
	{
		page: number;
		max: number;
	},
	KoliBriPaginationProps
>;

type RequiredProps = {
	headers: Stringified<KoliBriTableHeaders>;
} & PropLabel &
	PropTableData;
type OptionalProps = {
	allowMultiSort: boolean;
	pagination: boolean | Stringified<KoliBriTablePaginationProps>;
} & PropTableDataFoot &
	PropPaginationPosition &
	PropTableSelection &
	StatefulPropTableCallbacks &
	PropHasSettingsMenu;

type RequiredStates = {
	allowMultiSort: boolean;
	data: KoliBriTableDataType[];
	dataFoot: KoliBriTableDataType[];
	headers: KoliBriTableHeaders;
	pagination: KoliBriTablePaginationStates;
	sortedData: KoliBriTableDataType[];
} & PropLabel &
	PropPaginationPosition;
type OptionalStates = {
	sortDirection: KoliBriSortDirection;
	selection: KoliBriTableSelection;
} & StatefulPropTableCallbacks &
	PropHasSettingsMenu;

export type TableStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type TableAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

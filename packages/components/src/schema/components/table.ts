import type { Generic } from 'adopted-style-sheets';

import type { PropHasSettingsMenu, PropLabel, PropTableData, PropTableDataFoot, PropTableSelection, StatefulPropTableCallbacks } from '../props';
import type { PropMinWidth } from '../props/min-width';
import type { PropPaginationPosition } from '../props/pagination-position';
import type { PropTableSettings } from '../props/table-settings';
import type { KoliBriSortDirection, KoliBriTableDataType, KoliBriTableHeaderCell, KoliBriTableSelection, Stringified } from '../types';
import type { KoliBriPaginationProps } from './pagination';

export type KoliBriTableSelectedHead = { key: string; label: string; sortDirection: KoliBriSortDirection };

export type KoliBriSortFunction = (data: KoliBriTableDataType[]) => KoliBriTableDataType[];
export type KoliBriDataCompareFn = (a: KoliBriTableDataType, b: KoliBriTableDataType, sortDirection?: KoliBriSortDirection) => number;

export type KoliBriTableHeaderCellWithLogic = KoliBriTableHeaderCell & {
	compareFn?: KoliBriDataCompareFn;
	/**
	 * @deprecated Use `compareFn` instead. Will be removed in v4.
	 */
	_sort?: KoliBriSortFunction;
	sortDirection?: KoliBriSortDirection;
	headerCell?: true;
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
	PropMinWidth &
	PropTableData;
type OptionalProps = {
	allowMultiSort: boolean;
	pagination: boolean | Stringified<KoliBriTablePaginationProps>;
} & PropTableDataFoot &
	PropPaginationPosition &
	PropTableSelection &
	StatefulPropTableCallbacks &
	PropTableSettings &
	PropHasSettingsMenu;

type RequiredStates = {
	allowMultiSort: boolean;
	data: KoliBriTableDataType[];
	dataFoot: KoliBriTableDataType[];
	headers: KoliBriTableHeaders;
	pagination: KoliBriTablePaginationStates;
	sortedData: KoliBriTableDataType[];
} & PropLabel &
	PropMinWidth &
	PropPaginationPosition;
type OptionalStates = {
	sortDirection: KoliBriSortDirection;
	selection: KoliBriTableSelection;
} & StatefulPropTableCallbacks &
	PropTableSettings &
	PropHasSettingsMenu;

export type TableStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type TableAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

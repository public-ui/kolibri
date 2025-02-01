import type { Generic } from 'adopted-style-sheets';

import type { PropLabel, PropTableData, PropTableDataFoot, PropTableSelection, StatefulPropTableCallbacks } from '../props';
import type { PropPaginationPosition } from '../props/pagination-position';
import type { KoliBriSortDirection, KoliBriTableDataType, KoliBriTableHeaderCell, KoliBriTableSelection, Stringified } from '../types';
import type { KoliBriPaginationProps } from './pagination';

export type KoliBriDataCompareFn = (a: KoliBriTableDataType, b: KoliBriTableDataType) => number;

export type KoliBriTableHeaderCellWithLogic = KoliBriTableHeaderCell & {
	compareFn?: KoliBriDataCompareFn;
	sortDirection?: KoliBriSortDirection;
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
} & PropTableData &
	PropLabel;
type OptionalProps = {
	allowMultiSort: boolean;
	pagination: boolean | Stringified<KoliBriTablePaginationProps>;
} & PropTableDataFoot &
	PropPaginationPosition &
	PropTableSelection &
	StatefulPropTableCallbacks;

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
	/**
	 * Needed for internal use.
	 */
	minWidth: string;
	sortDirection: KoliBriSortDirection;
	selection: KoliBriTableSelection;
} & StatefulPropTableCallbacks;

export type TableStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type TableAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

import type { Generic } from 'adopted-style-sheets';

import type { PropLabel, PropTableCallbacks, PropTableData, PropTableDataFoot, PropTableSelection } from '../props';
import type { KoliBriTableDataType, KoliBriTableHeaderCell, Stringified, KoliBriSortDirection, KoliBriTableSelection } from '../types';
import type { KoliBriPaginationProps } from './pagination';
import type { PropPaginationPosition } from '../props/pagination-position';

export type KoliBriTableSelectedHead = { key: string; label: string; sortDirection: KoliBriSortDirection };

type KoliBriTableSort = <T>(data: T[]) => T[];

export type KoliBriSortFunction = (data: KoliBriTableDataType[]) => KoliBriTableDataType[];
export type KoliBriDataCompareFn = (a: KoliBriTableDataType, b: KoliBriTableDataType) => number;

export type KoliBriTableHeaderCellWithLogic = KoliBriTableHeaderCell & {
	compareFn?: KoliBriDataCompareFn;
	/**
	 * @deprecated use `compareFn` instead
	 */
	sort?: KoliBriTableSort;
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
	minWidth: string;
	pagination: boolean | Stringified<KoliBriTablePaginationProps>;
} & PropTableDataFoot &
	PropPaginationPosition &
	PropTableSelection &
	PropTableCallbacks;

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
	minWidth: string;
	sortDirection: KoliBriSortDirection;
	selection: KoliBriTableSelection;
} & PropTableCallbacks;

export type TableProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type TableStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type TableAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

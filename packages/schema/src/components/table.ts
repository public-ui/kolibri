import type { Generic } from 'adopted-style-sheets';

import type { PropLabel, PropTableData } from '../props';
import type { Stringified } from '../types';
import type { KoliBriPaginationProps } from './pagination';
import type { PropPaginationPosition } from '../props/pagination-position';

export type KoliBriTableSelectedHead = { key: string; label: string; sortDirection: KoliBriSortDirection };

export type KoliBriTableRender = <T>(domNode: HTMLElement, cell: KoliBriTableCell, tupel: T, data: T[]) => string | void;

type KoliBriTableSort = <T>(data: T[]) => T[];
export type KoliBriSortDirection = 'ASC' | 'DESC' | 'NOS';
export type KoliBriSortFunction = (data: KoliBriTableDataType[]) => KoliBriTableDataType[];
export type KoliBriDataCompareFn = (a: KoliBriTableDataType, b: KoliBriTableDataType) => number;

export type KoliBriTableDataType = Record<string, unknown>;

type KoliBriTableCellTextAlign = 'center' | 'left' | 'right' | 'justify';
export type KoliBriTableCell = {
	asTd?: boolean;
	colSpan?: number;
	label: string;
	render?: KoliBriTableRender;
	rowSpan?: number;
	textAlign?: KoliBriTableCellTextAlign;
	width?: string;
};

export type KoliBriTableHeaderCell = {
	key?: string;
	compareFn?: KoliBriDataCompareFn;
	/**
	 * @deprecated use `compareFn` instead
	 */
	sort?: KoliBriTableSort;
	sortDirection?: KoliBriSortDirection;
} & KoliBriTableCell;

export type KoliBriTableHeaders = {
	horizontal?: KoliBriTableHeaderCell[][];
	vertical?: KoliBriTableHeaderCell[][];
};
export type KoliBriTableHeaderCellAndData = {
	data: KoliBriTableDataType;
} & KoliBriTableHeaderCell;

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
	dataFoot: Stringified<KoliBriTableDataType[]>;
	minWidth: string;
	pagination: boolean | Stringified<KoliBriTablePaginationProps>;
} & PropPaginationPosition;

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
};

export type TableProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type TableStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type TableAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

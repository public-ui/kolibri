import { Generic } from '@a11y-ui/core';

import { Stringified } from '../../types/common';
import { PropLabel } from '../../types/props/label';
import { KoliBriPaginationProps } from '../pagination/types';

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
	sort?: KoliBriTableSort;
	textAlign?: KoliBriTableCellTextAlign;
	width?: string;
};

export type KoliBriTableHeaderCell = {
	asTd?: boolean;
	key?: string;
	compareFn?: KoliBriDataCompareFn;
	/**
	 * @deprecated use `compareFn` instead
	 */
	sort?: KoliBriTableSort;
	sortDirection?: KoliBriSortDirection;
	textAlign?: KoliBriTableCellTextAlign;
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
	data: Stringified<KoliBriTableDataType[]>;
	headers: Stringified<KoliBriTableHeaders>;
} & PropLabel;
type OptionalProps = {
	dataFoot: Stringified<KoliBriTableDataType[]>;
	minWidth: string;
	pagination: boolean | Stringified<KoliBriTablePaginationProps>;
};

type RequiredStates = {
	data: KoliBriTableDataType[];
	dataFoot: KoliBriTableDataType[];
	headers: KoliBriTableHeaders;
	pagination: KoliBriTablePaginationStates;
	sortedData: KoliBriTableDataType[];
} & PropLabel;
type OptionalStates = {
	minWidth: string;
	sortDirection: KoliBriSortDirection;
};

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

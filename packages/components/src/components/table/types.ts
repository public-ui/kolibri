import { Generic } from '@a11y-ui/core';

import { Stringified } from '../../types/common';
import { KoliBriPaginationProps } from '../pagination/types';

export type KoliBriTableRender = <T>(domNode: HTMLElement, cell: KoliBriTableCell, tupel: T, data: T[]) => string | void;

type KoliBriTableSort = <T>(data: T[]) => T[];
export type KoliBriSortDirection = 'ASC' | 'DESC' | 'NOS';
export type KoliBriSortFunction = (data: KoliBriTableDataType[]) => KoliBriTableDataType[];

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
		total: number;
	},
	KoliBriPaginationProps
>;

type RequiredProps = {
	caption: string;
	data: Stringified<KoliBriTableDataType[]>;
	headers: Stringified<KoliBriTableHeaders>;
};
type OptionalProps = {
	dataFoot: Stringified<KoliBriTableDataType[]>;
	minWidth: string;
	pagination: boolean | Stringified<KoliBriTablePaginationProps>;
};

type RequiredStates = {
	caption: string;
	data: KoliBriTableDataType[];
	dataFoot: KoliBriTableDataType[];
	headers: KoliBriTableHeaders;
	pagination: KoliBriTablePaginationStates;
	sortedData: KoliBriTableDataType[];
};
type OptionalStates = {
	minWidth: string;
	sortDirection: KoliBriSortDirection;
};

export type KoliBriTableStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriTableAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

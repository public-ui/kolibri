import { RequiredProps as PaginationRequiredProps, OptionalProps as PaginationOptionalProps } from '../components/pagination/component';
import { Generic } from '@a11y-ui/core';

export type KoliBriTableRender = <T>(domNode: HTMLElement, cell: KoliBriTableCell, tupel: T, data: T[]) => string | void;

type KoliBriTableSort = <T>(data: T[]) => T[];

type KoliBriTableCellTextAlign = 'center' | 'left' | 'right' | 'justify';

export type KoliBriDataType = Record<string, unknown>;

export type KoliBriSortFunction = (data: KoliBriDataType[]) => KoliBriDataType[];

export type KoliBriSortDirection = 'ASC' | 'DESC' | 'NOS';

export type KoliBriTablePaginationProps = Generic.Element.Members<
	{
		page: number;
	},
	PaginationRequiredProps & PaginationOptionalProps
>;
export type KoliBriTablePaginationStates = Generic.Element.Members<
	{
		page: number;
		total: number;
	},
	PaginationRequiredProps & PaginationOptionalProps
>;

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

export type KoliBriTableHeaderCell = KoliBriTableCell & {
	asTd?: boolean;
	key?: string;
	sort?: KoliBriTableSort;
	sortDirection?: KoliBriSortDirection;
	textAlign?: KoliBriTableCellTextAlign;
};

export type KoliBriTableHeaders = {
	horizontal?: KoliBriTableHeaderCell[][];
	vertical?: KoliBriTableHeaderCell[][];
};

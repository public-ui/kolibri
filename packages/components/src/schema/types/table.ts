export type KoliBriTableRender = <T>(domNode: HTMLElement, cell: KoliBriTableCell, tupel: T, data: T[]) => string | void;

export type KoliBriTableCellTextAlign = 'center' | 'left' | 'right' | 'justify';
export type KoliBriSortDirection = 'ASC' | 'DESC' | 'NOS';

export type KoliBriTableDataType = Record<string, unknown>;

export type KoliBriTableCell = {
	colSpan?: number;
	label: string;
	render?: KoliBriTableRender;
	rowSpan?: number;
	textAlign?: KoliBriTableCellTextAlign;
	data?: KoliBriTableDataType;
};

export type KoliBriTableHeaderCell = {
	colSpan?: number;
	label: string;
	key?: string;
	minWidth: string | number; // Required in V3
	render?: KoliBriTableRender;
	rowSpan?: number;
	sortDirection?: KoliBriSortDirection;
	textAlign?: KoliBriTableCellTextAlign;
	data?: KoliBriTableDataType;
};

export type KoliBriTableSelection = {
	label: (row: KoliBriTableDataType) => string;
	keyPropertyName?: string;
	multiple?: boolean;
	selectedKeys?: string[];
	disabledKeys?: string[];
};

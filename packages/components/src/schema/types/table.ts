export type KoliBriTableRender = <T>(domNode: HTMLElement, cell: KoliBriTableCell, tupel: T, data: T[]) => string | void;

export type KoliBriTableCellTextAlign = 'center' | 'left' | 'right' | 'justify';
export type KoliBriSortDirection = 'ASC' | 'DESC' | 'NOS';

export type KoliBriTableDataType = Record<string, unknown>;

export type KoliBriTableCell = {
	asTd?: boolean;
	colSpan?: number;
	label: string;
	keyPropertyName?: string;
	render?: KoliBriTableRender;
	rowSpan?: number;
	textAlign?: KoliBriTableCellTextAlign;
	width?: string;
	data?: KoliBriTableDataType;
};

export type KoliBriTableHeaderCell = KoliBriTableCell & {
	key?: string;
	sortDirection?: KoliBriSortDirection;
};

export type KoliBriTableSelection = {
	label: (row: KoliBriTableDataType) => string;
	keyPropertyName?: string;
	multiple?: boolean;
	selectedKeys?: string[];
};

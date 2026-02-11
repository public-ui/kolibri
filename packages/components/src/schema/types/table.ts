export type KoliBriTableRender = <T>(domNode: HTMLElement, cell: KoliBriTableCell, tupel: T, data: T[]) => string | void;

export type KoliBriTableCellTextAlign = 'center' | 'left' | 'right' | 'justify';
export type KoliBriSortDirection = 'ASC' | 'DESC' | 'NOS';

export type KoliBriTableDataType = Record<string, unknown>;
export type KoliBriTableSelectionKey = string | number;
export type KoliBriTableSelectionKeys = KoliBriTableSelectionKey[];

export type KoliBriTableCell = {
	colIndex?: number;
	colSpan?: number;
	data?: KoliBriTableDataType;
	fixed?: boolean;
	label: string;
	render?: KoliBriTableRender;
	rowSpan?: number;
	textAlign?: KoliBriTableCellTextAlign;
	width?: number;
};

export type KoliBriTableHeaderCell = KoliBriTableCell & {
	headerCell?: true;
	hidable?: boolean;
	key?: string;
	resizable?: boolean;
	sortable?: boolean;
	sortDirection?: KoliBriSortDirection;
	sortOrder?: number;
	visible?: boolean;
};

export type KoliBriTableSelection = {
	disabledKeys?: KoliBriTableSelectionKeys;
	keyPropertyName?: string;
	label: (row: KoliBriTableDataType) => string;
	multiple?: boolean;
	selectedKeys?: KoliBriTableSelectionKeys;
};

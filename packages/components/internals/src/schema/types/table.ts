export type KoliBriTableRender = <T>(domNode: HTMLElement, cell: KoliBriTableCell, tupel: T, data: T[]) => string | void;

export type KoliBriTableCellTextAlign = 'center' | 'left' | 'right' | 'justify';
export type KoliBriSortDirection = 'ASC' | 'DESC' | 'NOS';

export type KoliBriTableDataType = Record<string, unknown>;
export type KoliBriTableSelectionKey = string | number;
export type KoliBriTableSelectionKeys = KoliBriTableSelectionKey[];

export type KoliBriTableCell = {
	colIndex?: number;
	colSpan?: number;
	/** that's actually the row data! */
	data?: KoliBriTableDataType;
	label: string;
	render?: KoliBriTableRender;
	rowSpan?: number;
	textAlign?: KoliBriTableCellTextAlign;
	width?: number;
};

/**
 * Fields every column type shares: label, layout, sort state and the settings of the settings menu.
 * The column types are in `KoliBriTableHeaderCellWithLogic`.
 */
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

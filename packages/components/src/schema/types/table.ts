export type KoliBriTableRender = <T>(domNode: HTMLElement, cell: KoliBriTableCell, tupel: T, data: T[]) => string | void;

export type KoliBriTableCellTextAlign = 'center' | 'left' | 'right' | 'justify';
export type KoliBriSortDirection = 'ASC' | 'DESC' | 'NOS';

export type KoliBriTableDataType = Record<string, unknown>;

export type KoliBriTableCell = {
	/**
	 * @deprecated It should be working without this property, too. (needs a refactoring)
	 */
	asTd?: boolean;
	colSpan?: number;
	label: string;
	render?: KoliBriTableRender;
	rowSpan?: number;
	textAlign?: KoliBriTableCellTextAlign;
	width?: string;
	data?: KoliBriTableDataType;
};

export type KoliBriTableHeaderCellOptions = {
	/**
	 * Controls whether the column can be hidden through the table settings menu.
	 */
	hidable?: boolean;
	/**
	 * Controls whether the column can be resized through the table settings menu.
	 */
	sizable?: boolean;
	/**
	 * Controls whether the column can be sorted through the table settings menu.
	 */
	sortable?: boolean;
};

export type KoliBriTableHeaderCell = KoliBriTableCell & {
	key?: string;
	sortDirection?: KoliBriSortDirection;
	options?: KoliBriTableHeaderCellOptions;
};

export type KoliBriTableSelection = {
	label: (row: KoliBriTableDataType) => string;
	keyPropertyName?: string;
	multiple?: boolean;
	selectedKeys?: string[];
};

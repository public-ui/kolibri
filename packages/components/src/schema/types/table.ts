import type { ButtonProps } from '../components/button';

export type KoliBriTableRender = <T>(domNode: HTMLElement, cell: KoliBriTableCell, tupel: T, data: T[]) => string | void;

export type KoliBriTableCellTextAlign = 'center' | 'left' | 'right' | 'justify';
export type KoliBriSortDirection = 'ASC' | 'DESC' | 'NOS';

export type KoliBriTableDataType = Record<string, unknown>;
export type KoliBriTableSelectionKey = string | number;
export type KoliBriTableSelectionKeys = KoliBriTableSelectionKey[];

/**
 * Configuration for an action column cell containing a list of buttons.
 * Each button configuration follows the ButtonProps interface.
 */
export type KoliBriTableCellActions = {
	/**
	 * Array of button configurations to render in the cell.
	 */
	buttons: ButtonProps[];
};

export type KoliBriTableCell = {
	/**
	 * Action buttons to display in the cell. When provided, buttons are rendered
	 * directly without using custom render functions, improving performance.
	 */
	actions?: KoliBriTableCellActions;
	colSpan?: number;
	data?: KoliBriTableDataType;
	label: string;
	render?: KoliBriTableRender;
	rowSpan?: number;
	textAlign?: KoliBriTableCellTextAlign;
	width?: number;
};

export type KoliBriTableHeaderCell = KoliBriTableCell & {
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

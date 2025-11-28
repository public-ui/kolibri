export interface ColumnSettings {
	hidable?: boolean;
	key: string;
	label: string;
	sortable?: boolean;
	resizable?: boolean;
	visible: boolean;
	width?: number;
}

export interface TableSettings {
	columns: ColumnSettings[];
}

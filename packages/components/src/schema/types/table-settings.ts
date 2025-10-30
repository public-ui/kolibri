export interface ColumnSettings {
	hidable?: boolean;
	key: string;
	label: string;
	sortable?: boolean;
	sizable?: boolean;
	visible: boolean;
	width?: number;
}

export interface TableSettings {
	columns: ColumnSettings[];
}

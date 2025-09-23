export interface ColumnSettings {
	hidable?: boolean;
	key: string;
	label: string;
	position: number;
	visible: boolean;
	width?: number;
}

export interface TableSettings {
	columns: ColumnSettings[];
}

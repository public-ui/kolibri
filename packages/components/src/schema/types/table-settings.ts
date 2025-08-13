export interface ColumnSettings {
	hideable?: boolean;
	key: string;
	label: string;
	position: number;
	visible: boolean;
	width?: number;
}

export interface TableSettings {
	columns: ColumnSettings[];
}

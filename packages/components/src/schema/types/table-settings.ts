export interface ColumnSettings {
	key: string;
	label: string;
	minWidth: string;
	position: number;
	visible: boolean;
}

export interface TableSettings {
	columns: ColumnSettings[];
}

import type {
	ActionColumnHeaderCell,
	FixedColsPropType,
	KoliBriTableCell,
	KoliBriTableDataType,
	KoliBriTableHeaderCell,
	KoliBriTableHeaderCellWithLogic,
	KoliBriTableSelection,
	KoliBriTableSelectionKey,
	StateColumnHeaderCell,
} from '../../../schema';
import type { TableHeaders } from '../../props/table-headers';

/**
 * Pure helpers that derive the rendered table from its render props. They are shared by the
 * functional component (rendering) and the web component (sticky-column measurement), so both
 * agree on the column model.
 */

export type TableDataCell = KoliBriTableCell & KoliBriTableDataType;
export type TableDataRow = TableDataCell[];

/**
 * The header cells that define the data columns — those with a `key` or a `render` function.
 * They also fix the rendering direction: if only the vertical headers carry keys, the data is
 * rendered column-wise (`horizontal: false`).
 */
export type PrimaryHeaders = {
	cells: KoliBriTableHeaderCell[];
	horizontal: boolean;
};

const collectKeyedHeaderCells = (rows: KoliBriTableHeaderCell[][]): KoliBriTableHeaderCell[] =>
	rows.flatMap((cells) => cells.filter((cell) => typeof cell.key === 'string' || typeof cell.render === 'function'));

export const getPrimaryHeaders = (headers: TableHeaders): PrimaryHeaders => {
	const horizontalCells = collectKeyedHeaderCells(headers.horizontal);
	if (horizontalCells.length > 0) {
		return { cells: horizontalCells, horizontal: true };
	}
	const verticalCells = collectKeyedHeaderCells(headers.vertical);
	return { cells: verticalCells, horizontal: verticalCells.length === 0 };
};

const sumSpans = (cells: KoliBriTableHeaderCell[], span: 'colSpan' | 'rowSpan'): number => {
	let count = 0;
	if (Array.isArray(cells)) {
		cells.forEach((cell) => {
			count += cell[span] ?? 1;
		});
	}
	return count;
};

/** The widest horizontal header row decides the column count; without headers, the data does. */
export const getNumberOfCols = (horizontalHeaders: KoliBriTableHeaderCell[][], data: KoliBriTableDataType[]): number => {
	const max = Math.max(0, ...horizontalHeaders.map((row) => sumSpans(row, 'colSpan')));
	return max === 0 ? data.length : max;
};

/** The longest vertical header column decides the body row count; footer rows are not part of it. */
export const getNumberOfRows = (verticalHeaders: KoliBriTableHeaderCell[][], data: KoliBriTableDataType[], footLength: number): number => {
	const max = Math.max(0, ...verticalHeaders.map((column) => sumSpans(column, 'rowSpan')));
	return max === 0 ? data.length : max - footLength;
};

export const getVisibleColSpan = (cells?: Array<KoliBriTableCell | KoliBriTableHeaderCell>): number =>
	cells?.reduce((acc, cell) => {
		if ('visible' in cell && cell.visible === false) {
			return acc;
		}
		return acc + (cell.colSpan || 1);
	}, 0) ?? 0;

export type FixedSide = 'left' | 'right';

/**
 * Resolves which side a column sticks to, if any. A row's cell index also counts its vertical
 * header cells and can reach `maxCols`, so right-fixing needs a configured right count.
 */
export const getFixedSide = (fixedCols: FixedColsPropType, stickyColsDisabled: boolean, maxCols: number, index: number | undefined): FixedSide | undefined => {
	if (index === undefined || stickyColsDisabled) {
		return undefined;
	}
	if (index < fixedCols[0]) {
		return 'left';
	}
	if (fixedCols[1] > 0 && index >= maxCols - fixedCols[1]) {
		return 'right';
	}
	return undefined;
};

/**
 * Sticky offsets per column: the summed declared widths of the fixed columns between a column and
 * its edge of the table.
 */
export const getFixedOffsets = (
	primaryCells: KoliBriTableHeaderCell[],
	maxCols: number,
	fixedCols: FixedColsPropType,
	stickyColsDisabled: boolean,
): number[] => {
	const offsets: number[] = [];
	for (let j = 0; j < maxCols; j++) {
		if (getFixedSide(fixedCols, stickyColsDisabled, maxCols, j) === 'left') {
			offsets[j] = (offsets[j - 1] ?? 0) + (primaryCells[j - 1]?.width ?? 0);
		}
	}
	for (let j = maxCols - 1; j >= 0; j--) {
		if (getFixedSide(fixedCols, stickyColsDisabled, maxCols, j) === 'right') {
			offsets[j] = (offsets[j + 1] ?? 0) + (primaryCells[j + 1]?.width ?? 0);
		}
	}
	return offsets;
};

/**
 * CSS offset of a sticky cell. A left-fixed column also clears the selection column, which is
 * always sticky at `left: 0`.
 */
export const getOffsetString = (offsets: number[], index: number | undefined, left: boolean, hasSelection: boolean): string => {
	const offset = index === undefined ? undefined : offsets[index];
	if (left && hasSelection) {
		return `calc( var(--kol-table-selection-col-width) + ${offset}px)`;
	}
	return `${offset}px`;
};

/**
 * Finds the action or state column definition for a given data column.
 */
export const getColumnHeaderForType = (
	headers: TableHeaders,
	primaryHeaders: PrimaryHeaders,
	colIndex: number,
	type: 'action' | 'state',
): ActionColumnHeaderCell | StateColumnHeaderCell | undefined => {
	const directionHeaders = primaryHeaders.horizontal ? headers.horizontal : headers.vertical;
	if (directionHeaders.length === 0) return undefined;

	const header = primaryHeaders.cells[colIndex] as KoliBriTableHeaderCellWithLogic | undefined;
	if (header?.type === type) {
		return header;
	}
	return undefined;
};

type DataFieldOptions = {
	data: KoliBriTableDataType[];
	/** Footer rows; required to size the body and, with `isFoot`, the rows rendered. */
	dataFoot: KoliBriTableDataType[];
	headers: TableHeaders;
	isFoot: boolean;
	/** Text of the single cell a table without data renders. */
	noEntriesLabel: string;
	primaryHeaders: PrimaryHeaders;
};

/**
 * Lays out the cells of the body (or the footer) row by row: the vertical header cells that start
 * in a row, followed by one data cell per primary column. The footer continues the vertical
 * headers below the body rows.
 */
export const createDataField = ({ data, dataFoot, headers, isFoot, noEntriesLabel, primaryHeaders }: DataFieldOptions): TableDataRow[] => {
	const maxCols = getNumberOfCols(headers.horizontal, data);
	const primaryCells = primaryHeaders.cells;
	let maxRows = getNumberOfRows(headers.vertical, data, dataFoot.length);
	let startRow = 0;
	if (isFoot) {
		startRow = maxRows;
		maxRows += dataFoot.length;
	}
	const dataField: TableDataRow[] = [];

	const rowCount: number[] = [];
	const rowSpans: number[][] = [];
	headers.vertical.forEach((_row, index) => {
		rowCount[index] = 0;
		rowSpans[index] = [];
	});

	for (let i = startRow; i < maxRows; i++) {
		const dataRow: TableDataRow = [];
		headers.vertical.forEach((headerCells, index) => {
			let rowsTotal = 0;
			rowSpans[index].forEach((value) => (rowsTotal += value));
			if (rowsTotal <= i) {
				const rows = headerCells[i - rowsTotal + rowCount[index]];
				if (typeof rows === 'object') {
					dataRow.push({
						...rows,
						headerCell: true,
						data: {},
					});
					let rowSpan = 1;
					if (typeof rows.rowSpan === 'number' && rows.rowSpan > 1) {
						rowSpan = rows.rowSpan;
					}
					rowSpans[index].push(rowSpan);
					if (typeof rows.colSpan === 'number' && rows.colSpan > 1) {
						for (let k = 1; k < rows.colSpan; k++) {
							rowSpans[index + k].push(rowSpan);
						}
					}
					rowCount[index]++;
				}
			}
		});
		for (let j = 0; j < maxCols; j++) {
			if (primaryHeaders.horizontal) {
				const row = isFoot ? dataFoot[i - startRow] : data[i];
				const header = primaryCells[j];
				if (typeof header === 'object' && header !== null && typeof row === 'object' && row !== null) {
					dataRow.push({
						...header,
						colIndex: j,
						colSpan: undefined,
						rowSpan: undefined,
						data: row,
						label: row[header.key as string] as string,
					});
				}
			} else {
				const header = primaryCells[i];
				if (typeof header === 'object' && header !== null && typeof data[j] === 'object' && data[j] !== null) {
					dataRow.push({
						...header,
						colIndex: j,
						colSpan: undefined,
						rowSpan: undefined,
						data: data[j],
						label: data[j][header.key as unknown as number] as string,
					});
				}
			}
		}
		dataField.push(dataRow);
	}
	if (data.length === 0) {
		let colspan = getVisibleColSpan(headers.horizontal[0]);
		let rowspan = 0;

		if (headers.vertical.length > 0) {
			colspan -= headers.vertical.length;
			headers.vertical[0].forEach((row) => {
				rowspan += row.rowSpan || 1;
			});
		}
		const emptyCell = {
			colSpan: colspan,
			label: noEntriesLabel,
			render: undefined,
			rowSpan: Math.max(rowspan, 1),
		};
		if (dataField.length === 0) {
			dataField.push([emptyCell]);
		} else {
			dataField[0].push(emptyCell);
		}
	}
	return dataField;
};

/**
 * Minimum width of the table: the sum of all declared header widths (all horizontal rows including
 * merged parent cells, and all vertical header cells). Widths declared on both a parent and its
 * children are all summed.
 */
export const getTableMinWidth = ({ horizontal, vertical }: TableHeaders): string => {
	const horizontalWidths = horizontal.flatMap((row) =>
		row.filter((cell) => cell.visible !== false && cell.width !== undefined && cell.width > 0).map((cell) => cell.width as number),
	);
	const verticalWidths = vertical.flatMap((column) => column.filter((cell) => cell.width !== undefined && cell.width > 0).map((cell) => cell.width as number));
	const allWidths = [...verticalWidths, ...horizontalWidths];

	if (allWidths.length === 0) {
		return '0px';
	}
	if (allWidths.length === 1) {
		return `${allWidths[0]}px`;
	}
	return `calc(${allWidths.map((w) => `${w}px`).join(' + ')})`;
};

export const normalizeSelectionKeys = (value?: KoliBriTableSelectionKey | KoliBriTableSelectionKey[]): KoliBriTableSelectionKey[] =>
	value === undefined ? [] : Array.isArray(value) ? value : [value];

export const getSelectionKeyPropertyName = (selection: KoliBriTableSelection | false): string => (selection ? selection.keyPropertyName : undefined) ?? 'id';

/**
 * Selection state derived once per render: string sets allow O(1) membership checks per row
 * instead of scanning the key arrays for every row.
 */
export type SelectionModel = {
	disabledKeys: Set<string>;
	keyPropertyName: string;
	selectedKeys: KoliBriTableSelectionKey[];
	selectedKeysSet: Set<string>;
};

export const createSelectionModel = (selection: KoliBriTableSelection | false): SelectionModel => {
	const selectedKeys = selection ? normalizeSelectionKeys(selection.selectedKeys) : [];
	return {
		disabledKeys: new Set((selection ? normalizeSelectionKeys(selection.disabledKeys) : []).map(String)),
		keyPropertyName: getSelectionKeyPropertyName(selection),
		selectedKeys,
		selectedKeysSet: new Set(selectedKeys.map(String)),
	};
};

/** Rows whose selection is not disabled. */
export const getSelectableRows = (data: KoliBriTableDataType[], model: SelectionModel): KoliBriTableDataType[] =>
	data.filter((item) => !model.disabledKeys.has(String(item[model.keyPropertyName] as KoliBriTableSelectionKey)));

/**
 * The selection after toggling "select all": already selected but disabled rows always stay
 * selected; with `selectAll`, every selectable row is added.
 */
export const getSelectAllSelection = (data: KoliBriTableDataType[], model: SelectionModel, selectAll: boolean): KoliBriTableSelectionKey[] => {
	const selection = model.selectedKeys.filter((key) => model.disabledKeys.has(String(key)));
	if (selectAll) {
		selection.push(...getSelectableRows(data, model).map((row) => row?.[model.keyPropertyName] as KoliBriTableSelectionKey));
	}
	return selection;
};

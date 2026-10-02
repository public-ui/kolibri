import type {
	DefaultHeaderCell,
	KoliBriDataCompareFn,
	KoliBriSortDirection,
	KoliBriTableDataType,
	KoliBriTableHeaderCell,
	KoliBriTableHeaderCellWithLogic,
	KoliBriTableHeaders,
	KoliBriTableSelection,
	KoliBriTableSelectionKeys,
	TableHeaderCells,
} from '../../../schema';

/** One sorted column; the order of the entries is the sort priority. */
export type SortData = {
	label: string;
	key: string;
	compareFn: KoliBriDataCompareFn;
	direction: KoliBriSortDirection;
};

/** Only header cells of the type `default` (or without type) take part in sorting. */
const isDefaultCell = (cell: KoliBriTableHeaderCellWithLogic): cell is DefaultHeaderCell => cell.type === undefined || cell.type === 'default';

/**
 * Advances the sort of a header cell: unsorted → ascending → descending → unsorted. Without
 * `allowMultiSort`, sorting another column than the first sorted one starts a new sort. Returns
 * `undefined` for a cell that cannot be sorted, which leaves the sort and the sorted data unchanged.
 */
export function changeCellSort(sortData: SortData[], headerCell: KoliBriTableHeaderCellWithLogic, allowMultiSort: boolean): SortData[] | undefined {
	if (!isDefaultCell(headerCell) || typeof headerCell.compareFn !== 'function') {
		return undefined;
	}
	let next = !allowMultiSort && headerCell.key !== sortData[0]?.key ? [] : sortData.map((entry) => ({ ...entry }));
	const index = next.findIndex((entry) => entry.key === headerCell.key);
	if (index >= 0) {
		const entry = next[index];
		switch (entry.direction) {
			case 'ASC':
				entry.direction = 'DESC';
				break;
			case 'DESC':
				next = next.filter((_, position) => position !== index);
				break;
			default:
				entry.direction = 'ASC';
				break;
		}
	} else if (headerCell.key) {
		next.push({ label: headerCell.label, key: headerCell.key, compareFn: headerCell.compareFn, direction: 'ASC' });
	}
	return next;
}

/**
 * Reads the initial sort from the `sortDirection` of the header cells. Each header row starts the sort
 * anew, so the last row with a sortable cell defines it. Without `allowMultiSort` only the first sorted
 * cell of that row counts. `hasSortedCells` reports whether any row has a sorted cell; `missingKey`
 * reports whether a sortable cell lacks its `key`.
 */
export function initializeSortFromHeaders(
	headers: KoliBriTableHeaders,
	allowMultiSort: boolean,
): { sortData: SortData[]; hasSortedCells: boolean; missingKey: boolean } {
	let sortData: SortData[] = [];
	let hasSortedCells = false;
	let missingKey = false;
	const applySort = (cells: KoliBriTableHeaderCellWithLogic[]) => {
		sortData = [];
		cells.forEach((cell) => {
			if (!isDefaultCell(cell)) {
				return;
			}
			if (typeof cell.compareFn === 'function' && !cell.key) {
				missingKey = true;
				return;
			}
			const key = cell.key;
			if (!key) {
				return;
			}
			const direction = cell.sortDirection;
			if ((direction === 'ASC' || direction === 'DESC') && typeof cell.compareFn === 'function') {
				if (allowMultiSort || sortData.length === 0) {
					sortData.push({ label: cell.label, key, compareFn: cell.compareFn, direction });
				}
				hasSortedCells = true;
			}
		});
	};
	headers.horizontal?.forEach(applySort);
	headers.vertical?.forEach(applySort);
	return { sortData, hasSortedCells, missingKey };
}

/** Whether both horizontal and vertical headers are defined; sorting is not possible then. */
export function hasHeadersInBothDirections(headers: KoliBriTableHeaders): boolean {
	return Boolean(headers.horizontal && headers.vertical && headers.horizontal.length > 0 && headers.vertical.length > 0);
}

/**
 * Sorts a copy of the rows by the sorted columns in their priority order. With `disableSort` the rows
 * are returned as they are.
 */
export function sortRows(data: KoliBriTableDataType[], sortData: SortData[], disableSort: boolean): KoliBriTableDataType[] {
	if (disableSort) {
		return data;
	}
	const sorted = [...data];
	if (sortData.length > 0) {
		sorted.sort((a, b) => {
			for (const entry of sortData) {
				const result = entry.compareFn(a, b, entry.direction);
				if (result !== 0) {
					return entry.direction === 'ASC' ? result : -result;
				}
			}
			return 0;
		});
	}
	return sorted;
}

/**
 * The rows of one page and the end of their slice; the table renders its pagination only while the end
 * is above 0. A page size or page that is no positive number shows all rows.
 */
export function selectDisplayedData(data: KoliBriTableDataType[], pageSize: number, page: number): { rows: KoliBriTableDataType[]; end: number } {
	if (typeof pageSize === 'number' && pageSize > 0 && typeof page === 'number' && page > 0) {
		const end = pageSize * page > data.length ? data.length : pageSize * page;
		return { rows: data.slice(pageSize * (page - 1), end), end };
	}
	return { rows: data, end: data.length };
}

/** The sort direction shown on a header cell; `'NOS'` marks a sortable cell that is not sorted. */
export function getHeaderCellSortState(
	headerCell: KoliBriTableHeaderCellWithLogic,
	sortData: SortData[],
	disableSort: boolean,
): KoliBriSortDirection | undefined {
	if (!isDefaultCell(headerCell)) {
		return undefined;
	}
	if (!disableSort && typeof headerCell.compareFn === 'function') {
		if (headerCell.key) {
			const entry = sortData.find((value) => value.key === headerCell.key);
			if (entry?.direction) {
				return entry.direction;
			}
		}
		return 'NOS';
	}
	return undefined;
}

/** The 1-based sort priority shown on a header cell; only with `allowMultiSort`. */
export function getHeaderCellSortOrder(
	headerCell: KoliBriTableHeaderCellWithLogic,
	sortData: SortData[],
	disableSort: boolean,
	allowMultiSort: boolean,
): number | undefined {
	if (!isDefaultCell(headerCell)) {
		return undefined;
	}
	if (!disableSort && allowMultiSort && typeof headerCell.compareFn === 'function' && headerCell.key) {
		const index = sortData.findIndex((value) => value.key === headerCell.key);
		if (index >= 0) {
			return index + 1;
		}
	}
	return undefined;
}

/** Finds the header cell of a key in the horizontal and then the vertical headers. */
export function findHeaderCell(headers: KoliBriTableHeaders, key: string): KoliBriTableHeaderCellWithLogic | undefined {
	const cells: KoliBriTableHeaderCellWithLogic[] = [];
	for (const row of [...(headers.horizontal ?? []), ...(headers.vertical ?? [])]) {
		if (Array.isArray(row)) {
			cells.push(...row);
		}
	}
	return cells.find((cell) => cell.key === key);
}

/** Whether the set or order of column keys differs; header cells adjusted by the user only fit the same columns. */
export function headerKeysChanged(previous: KoliBriTableHeaders, next: KoliBriTableHeaders): boolean {
	const getKeys = (headers: KoliBriTableHeaders): string[] => [
		...(headers.horizontal?.flatMap((row) => row.map((cell) => cell?.key).filter((key): key is string => Boolean(key))) ?? []),
		...(headers.vertical?.flatMap((column) => column.map((cell) => cell?.key).filter((key): key is string => Boolean(key))) ?? []),
	];
	const previousKeys = getKeys(previous);
	const nextKeys = getKeys(next);
	return previousKeys.length !== nextKeys.length || previousKeys.some((key, index) => key !== nextKeys[index]);
}

/**
 * Lays the header cells adjusted in the settings menu (order, visibility, width, …) over the horizontal
 * header cells of `_headers`, matched by `key`. The logic fields such as `compareFn` always come from
 * `_headers`.
 */
export function mergeAdjustedHeaderCells(headers: KoliBriTableHeaders, adjusted: KoliBriTableHeaderCell[][]): KoliBriTableHeaderCellWithLogic[][] {
	const originalByKey = new Map<string, KoliBriTableHeaderCellWithLogic>();
	headers.horizontal?.forEach((row) =>
		row.forEach((cell) => {
			if (cell?.key) {
				originalByKey.set(cell.key, cell);
			}
		}),
	);

	return adjusted.map((row) =>
		row.map((cell) => {
			const original = cell?.key ? originalByKey.get(cell.key) : undefined;
			if (!original) {
				return cell as KoliBriTableHeaderCellWithLogic;
			}
			const merged = { ...original };
			if (cell.visible !== undefined) merged.visible = cell.visible;
			if (cell.width !== undefined) merged.width = cell.width;
			if (cell.hidable !== undefined) merged.hidable = cell.hidable;
			if (cell.sortable !== undefined) merged.sortable = cell.sortable;
			if (cell.resizable !== undefined) merged.resizable = cell.resizable;
			return merged;
		}),
	);
}

/**
 * The header cells for the stateless table: the horizontal cells adjusted in the settings menu (if any)
 * merged over `_headers`, each cell with its current sort direction and sort order.
 */
export function buildHeaderCells(
	headers: KoliBriTableHeaders,
	adjustedHeaderCells: TableHeaderCells | undefined,
	sortData: SortData[],
	disableSort: boolean,
	allowMultiSort: boolean,
): TableHeaderCells {
	const overlaySortState = (cell: KoliBriTableHeaderCellWithLogic) =>
		cell
			? {
					...cell,
					sortDirection: getHeaderCellSortState(cell, sortData, disableSort),
					sortOrder: getHeaderCellSortOrder(cell, sortData, disableSort, allowMultiSort),
				}
			: cell;

	const horizontalHeaders = adjustedHeaderCells?.horizontal ? mergeAdjustedHeaderCells(headers, adjustedHeaderCells.horizontal) : headers.horizontal;

	return {
		horizontal: horizontalHeaders?.map((row) => row.map(overlaySortState)) ?? [],
		vertical: headers.vertical?.map((column) => column.map(overlaySortState)) ?? [],
	};
}

/**
 * The rows of the selected keys, in sorted order and across all pages. Without a selection (or with an
 * empty `keyPropertyName`) it returns `null`.
 */
export function getSelectedData(
	selection: KoliBriTableSelection | undefined,
	sortedData: KoliBriTableDataType[],
	selectedKeys: KoliBriTableSelectionKeys,
): KoliBriTableDataType[] | null {
	if (selection) {
		const keyPropertyName = selection.keyPropertyName ?? 'id';
		const keySet = new Set(selectedKeys.map(String));
		const data = sortedData.filter((item) => keySet.has(String(item[keyPropertyName] as string | number)));
		if (keyPropertyName) return data;
	}
	return null;
}

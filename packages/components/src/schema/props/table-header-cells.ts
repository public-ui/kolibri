import type { Generic } from 'adopted-style-sheets';
import type { KoliBriTableHeaderCell, Stringified } from '../types';
import { emptyStringByArrayHandler, objectObjectHandler, parseJson, watchValidator } from '../utils';

/* types */
export type TableHeaderCells = {
	horizontal?: KoliBriTableHeaderCell[][];
	vertical?: KoliBriTableHeaderCell[][];
};

export type TableHeaderCellsPropType = Stringified<TableHeaderCells>;

/**
 * Defines the horizontal and vertical table header cells.
 */
export type PropTableHeaderCells = {
	headerCells: TableHeaderCellsPropType;
};

const isHeaderRows = (rows: unknown): rows is KoliBriTableHeaderCell[][] => {
	return Array.isArray(rows) && rows.every((headerRow) => Array.isArray(headerRow));
};

/* validator */
export const validateTableHeaderCells = (component: Generic.Element.Component, value?: TableHeaderCellsPropType): void => {
	emptyStringByArrayHandler(value, () => {
		objectObjectHandler(value, () => {
			try {
				value = parseJson<TableHeaderCells>(value);
			} catch (e) {
				void e;
			}
			watchValidator(
				component,
				'_headerCells',
				(value): boolean => {
					if (typeof value !== 'object' || value === null) return false;
					const horizontal = value.horizontal;
					const vertical = value.vertical;
					if ((horizontal !== undefined && !isHeaderRows(horizontal)) || (vertical !== undefined && !isHeaderRows(vertical))) {
						return false;
					}

					const allHeaderCells: KoliBriTableHeaderCell[] = [];
					for (const row of horizontal ?? []) {
						allHeaderCells.push(...row);
					}
					for (const col of vertical ?? []) {
						allHeaderCells.push(...col);
					}

					return allHeaderCells.every((cell) => cell.width === undefined || typeof cell.width === 'number');
				},
				new Set(['TableHeaderCellsPropType']),
				value,
			);
		});
	});
};

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
				(value): boolean =>
					typeof value === 'object' &&
					value !== null &&
					(value.horizontal === undefined ||
						(Array.isArray(value.horizontal) && value.horizontal.find((headerRow) => !Array.isArray(headerRow)) === undefined)) &&
					(value.vertical === undefined || (Array.isArray(value.vertical) && value.vertical.find((headerCol) => !Array.isArray(headerCol)) === undefined)) &&
					true,
				new Set(['TableHeaderCellsPropType']),
				value,
				{
					hooks: {
						afterPatch: (value: unknown, state: Record<string, unknown>): void => {
							const headerCells = value as TableHeaderCells;
							const widths: string[] = [];
							headerCells.horizontal?.forEach((headerRow) => {
								headerRow.forEach((headerCell) => {
									if (headerCell.width) {
										widths.push(headerCell.width);
									}
								});
							});
							if (widths.length > 0) {
								state._minWidth = `calc(${widths.join(' + ')})`;
							}
						},
					},
				},
			);
		});
	});
};

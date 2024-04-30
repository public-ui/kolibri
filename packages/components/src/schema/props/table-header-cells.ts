import type { Generic } from 'adopted-style-sheets';
import { emptyStringByArrayHandler, objectObjectHandler, parseJson, watchValidator } from '../utils';
import type { KoliBriTableHeaderCell, Stringified } from '../types';

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
				// eslint-disable-next-line no-empty
			} catch (e) {
				// value keeps the original data
			}
			watchValidator(component, '_headerCells', (value): boolean => typeof value === 'object' && value !== null, new Set(['TableHeaderCellsPropType']), value);
		});
	});
};

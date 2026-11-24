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

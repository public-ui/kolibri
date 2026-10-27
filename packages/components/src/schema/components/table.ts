import type { Generic } from 'adopted-style-sheets';

import type { KoliBriSortDirection, KoliBriTableDataType, KoliBriTableHeaderCell } from '../types';
import type { BadgeProps } from './badge';
import type { InternalButtonProps } from './button';
import type { LinkProps } from './link';
import type { KoliBriPaginationProps } from './pagination';

/**
 * Action column item type that can be either a button or a link.
 */
type ActionColumnPropType =
	| ({
			type: 'button';
	  } & InternalButtonProps)
	| ({
			type: 'link';
	  } & LinkProps);

/**
 * State column item type that can be either a button or a link.
 */
export type StateColumnPropType = {
	type: 'badge';
} & BadgeProps;

export type KoliBriDataCompareFn = (a: KoliBriTableDataType, b: KoliBriTableDataType, sortDirection?: KoliBriSortDirection) => number;

export type DefaultHeaderCell = KoliBriTableHeaderCell & {
	type?: 'default';
	compareFn?: KoliBriDataCompareFn;
	sortDirection?: KoliBriSortDirection;
};

export type KoliBriTableHeaderCellWithLogic = DefaultHeaderCell | ActionColumnHeaderCell | StateColumnHeaderCell;

/**
 * Action column header cell that defines actions for each row.
 * The actions function receives the row data and returns an array of action items (buttons or links).
 */
export type ActionColumnHeaderCell = KoliBriTableHeaderCell & {
	type: 'action';
	actions: (row: KoliBriTableDataType) => ActionColumnPropType[];
};

/**
 * State column header cell that defines states for each row.
 * The states function receives the row data and returns an array of state items (badges).
 */
export type StateColumnHeaderCell = KoliBriTableHeaderCell & {
	type: 'state';
};

export type KoliBriTableHeaders = {
	horizontal?: KoliBriTableHeaderCellWithLogic[][];
	vertical?: KoliBriTableHeaderCellWithLogic[][];
};

export type KoliBriTablePaginationProps = Generic.Element.Members<
	{
		page: number;
	},
	KoliBriPaginationProps
>;

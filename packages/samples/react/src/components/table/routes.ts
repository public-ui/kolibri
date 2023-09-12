import { Routes } from '../../shares/types';

import { TableBadgeSize } from './badge-size';

import { TableRenderCell } from './render-cell';

import { TableSortTabel } from './sort-date';

export const TABLE_ROUTES: Routes = {
	table: {
		'badge-size': TableBadgeSize,
		'render-cell': TableRenderCell,
		'sort-data': TableSortTabel,
	},
};

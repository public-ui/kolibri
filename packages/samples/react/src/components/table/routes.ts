import { Routes } from '../../shares/types';

import { TableBadgeSize } from './badge-size';

import { TableRenderCell } from './render-cell';

import { TableSortTable } from './sort-date';
import { TableWithPagination } from './with-pagination';

export const TABLE_ROUTES: Routes = {
	table: {
		'badge-size': TableBadgeSize,
		'render-cell': TableRenderCell,
		'sort-data': TableSortTable,
		'with-pagination': TableWithPagination,
	},
};

import { Routes } from '../../shares/types';

import { TableBadgeSize } from './badge-size';
import { TableColumnAlignment } from './column-alignment';
import { TableRenderCell } from './render-cell';
import { TableSortData } from './sort-data';
import { TableWithPagination } from './with-pagination';

export const TABLE_ROUTES: Routes = {
	table: {
		'badge-size': TableBadgeSize,
		'column-alignment': TableColumnAlignment,
		'render-cell': TableRenderCell,
		'sort-data': TableSortData,
		'with-pagination': TableWithPagination,
	},
};

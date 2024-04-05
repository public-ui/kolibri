import { Routes } from '../../shares/types';
import { PaginationPosition } from './pagination-position';
import { TableBadgeSize } from './badge-size';
import { TableColumnAlignment } from './column-alignment';
import { TableComplexHeaders } from './complex-headers';
import { TableHorizontalScrollbar } from './horizontal-scrollbar';
import { TableRenderCell } from './render-cell';
import { TableSortData } from './sort-data';
import { TableStateless } from './stateless';
import { TableWithPagination } from './with-pagination';

export const TABLE_ROUTES: Routes = {
	table: {
		'badge-size': TableBadgeSize,
		'column-alignment': TableColumnAlignment,
		'complex-headers': TableComplexHeaders,
		'horizontal-scrollbar': TableHorizontalScrollbar,
		'pagination-position': PaginationPosition,
		'render-cell': TableRenderCell,
		'sort-data': TableSortData,
		'with-pagination': TableWithPagination,
		stateless: TableStateless,
	},
};

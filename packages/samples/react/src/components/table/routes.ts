import { Routes } from '../../shares/types';
import { TableRenderCell } from './render-cell';
import { TableSortData } from './sort-date';
import { TableWithPagination } from './with-pagination';
import { TableColumnAlignment } from './column-alignment';
import { TableHorizontalScrollbar } from './horizontal-scrollbar';

export const TABLE_ROUTES: Routes = {
	table: {
		'column-alignment': TableColumnAlignment,
		'horizontal-scrollbar': TableHorizontalScrollbar,
		'render-cell': TableRenderCell,
		'sort-data': TableSortData,
		'with-pagination': TableWithPagination,
	},
};

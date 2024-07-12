import { Routes } from '../../shares/types';
import { PaginationPosition } from './pagination-position';
import { TableColumnAlignment } from './column-alignment';
import { TableComplexHeaders } from './complex-headers';
import { TableHorizontalScrollbar } from './horizontal-scrollbar';
import { TableRenderCell } from './render-cell';
import { TableSortData } from './sort-data';
import { TableStateless } from './stateless';
import { TableWithFooter } from './with-footer';
import { TableStatefulWithSelection } from './stateful-with-selection';
import { TableStatelessWithSelection } from './stateless-with-selection';
import { TableWithPagination } from './with-pagination';

export const TABLE_ROUTES: Routes = {
	table: {
		'column-alignment': TableColumnAlignment,
		'complex-headers': TableComplexHeaders,
		'horizontal-scrollbar': TableHorizontalScrollbar,
		'pagination-position': PaginationPosition,
		'render-cell': TableRenderCell,
		'sort-data': TableSortData,
		'with-footer': TableWithFooter,
		'stateful-with-selection': TableStatefulWithSelection,
		'stateless-with-selection': TableStatelessWithSelection,
		'with-pagination': TableWithPagination,
		stateless: TableStateless,
	},
};

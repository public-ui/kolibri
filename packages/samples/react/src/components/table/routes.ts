import { Routes } from '../../shares/types';
import { PaginationPosition } from './pagination-position';
import { TableColumnAlignment } from './column-alignment';
import { TableComplexHeaders } from './complex-headers';
import { TableHorizontalScrollbar } from './horizontal-scrollbar';
import { TableRenderCell } from './render-cell';
import { TableSelectionKeyByData } from './selection-key-by-data';
import { TableSortData } from './sort-data';
import { TableStateless } from './stateless';
import { TableWithFooter } from './with-footer';
import { TableStatefulWithSelection } from './stateful-with-selection';
import { TableStatefulWithSingleSelection } from './stateful-with-single-selection';
import { TableStatelessWithSelection } from './stateless-with-selection';
import { TableStatelessWithSingleSelection } from './stateless-with-single-selection';
import { TableWithPagination } from './with-pagination';

export const TABLE_ROUTES: Routes = {
	table: {
		'column-alignment': TableColumnAlignment,
		'complex-headers': TableComplexHeaders,
		'horizontal-scrollbar': TableHorizontalScrollbar,
		'pagination-position': PaginationPosition,
		'render-cell': TableRenderCell,
		'selection-key-by-data': TableSelectionKeyByData,
		'sort-data': TableSortData,
		'with-footer': TableWithFooter,
		'stateful-with-selection': TableStatefulWithSelection,
		'stateful-with-single-selection': TableStatefulWithSingleSelection,
		'stateless-with-selection': TableStatelessWithSelection,
		'stateless-with-single-selection': TableStatelessWithSingleSelection,
		'with-pagination': TableWithPagination,
		stateless: TableStateless,
	},
};

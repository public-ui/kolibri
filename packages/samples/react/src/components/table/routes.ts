import { Routes } from '../../shares/types';
import { TableColumnAlignment } from './column-alignment';
import { TableComplexHeaders } from './complex-headers';
import { TableDirectionAwareSort } from './direction-aware-sort';
import { TableHorizontalScrollbar } from './horizontal-scrollbar';
import { InteractiveChildElements } from './interactive-child-elements';
import { MultiSortTable } from './multi-sort';
import { PaginationPosition } from './pagination-position';
import { TableRenderCell } from './render-cell';
import { TableSortData } from './sort-data';
import { TableStatefulWithSelection } from './stateful-with-selection';
import { TableStatefulWithSingleSelection } from './stateful-with-single-selection';
import { TableStateless } from './stateless';
import { TableStatelessWithSelection } from './stateless-with-selection';
import { TableStatelessWithSingleSelection } from './stateless-with-single-selection';
import { TableWithFooter } from './with-footer';
import { TableWithPagination } from './with-pagination';

export const TABLE_ROUTES: Routes = {
	table: {
		'column-alignment': TableColumnAlignment,
		'complex-headers': TableComplexHeaders,
		'horizontal-scrollbar': TableHorizontalScrollbar,
		'pagination-position': PaginationPosition,
		'render-cell': TableRenderCell,
		'sort-data': TableSortData,
		'direction-aware-sort': TableDirectionAwareSort,
		'with-footer': TableWithFooter,
		'stateful-with-selection': TableStatefulWithSelection,
		'stateful-with-single-selection': TableStatefulWithSingleSelection,
		'stateless-with-selection': TableStatelessWithSelection,
		'stateless-with-single-selection': TableStatelessWithSingleSelection,
		'with-pagination': TableWithPagination,
		'interactive-child-elements': InteractiveChildElements,
		stateless: TableStateless,
		'multi-sort': MultiSortTable,
	},
};

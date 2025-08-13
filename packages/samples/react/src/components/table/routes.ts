import { Routes } from '../../shares/types';
import { InteractiveChildElements } from './interactive-child-elements';
import { MultiSortTable } from './multi-sort';
import { PaginationPosition } from './pagination-position';
import { PredefinedSettings } from './predefined-settings';
import { TableColumnAlignment } from './column-alignment';
import { TableComplexHeaders } from './complex-headers';
import { TableHorizontalScrollbar } from './horizontal-scrollbar';
import { TableNonHideableColumns } from './non-hideable-columns';
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
		'interactive-child-elements': InteractiveChildElements,
		'multi-sort': MultiSortTable,
		'non-hideable-columns': TableNonHideableColumns,
		'pagination-position': PaginationPosition,
		'predefined-settings': PredefinedSettings,
		'render-cell': TableRenderCell,
		'sort-data': TableSortData,
		'stateful-with-selection': TableStatefulWithSelection,
		'stateful-with-single-selection': TableStatefulWithSingleSelection,
		stateless: TableStateless,
		'stateless-with-selection': TableStatelessWithSelection,
		'stateless-with-single-selection': TableStatelessWithSingleSelection,
		'with-footer': TableWithFooter,
		'with-pagination': TableWithPagination,
	},
};

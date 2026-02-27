import type { Routes } from '../../shares/types';
import { TableActionColumns } from './action-columns';
import { TableActionColumnPerformance } from './action-columns-performance';
import { TableColumnAlignment } from './column-alignment';
import { TableComplexHeaders } from './complex-headers';
import { TableDirectionAwareSort } from './direction-aware-sort';
import { TableHighlightRow } from './highlight-row';
import { TableHorizontalScrollbar } from './horizontal-scrollbar';
import { InteractiveChildElements } from './interactive-child-elements';
import { MultiSortTable } from './multi-sort';
import { TableNonHidableColumns } from './non-hidable-columns';
import { PaginationPosition } from './pagination-position';
import { PredefinedSettings } from './predefined-settings';
import { TableRenderCell } from './render-cell';
import { TableSettingsColumnOptions } from './settings-column-options';
import { TableSortData } from './sort-data';
import { TableStatefulWithSelection } from './stateful-with-selection';
import { TableStatefulWithSingleSelection } from './stateful-with-single-selection';
import { TableStateless } from './stateless';
import { TableStatelessAsync } from './stateless-async-paging';
import { TableStatelessWithSelection } from './stateless-with-selection';
import { TableStatelessWithSettingsMenu } from './stateless-with-settings-menu';
import { TableStatelessWithSingleSelection } from './stateless-with-single-selection';
import { TableStickyHeader } from './sticky-header';
import { TableWithFooter } from './with-footer';
import { TableWithPagination } from './with-pagination';

export const TABLE_ROUTES: Routes = {
	table: {
		'column-alignment': TableColumnAlignment,
		'complex-headers': TableComplexHeaders,
		'horizontal-scrollbar': TableHorizontalScrollbar,
		'interactive-child-elements': InteractiveChildElements,
		'multi-sort': MultiSortTable,
		'highlight-row': TableHighlightRow,
		'non-hidable-columns': TableNonHidableColumns,
		'pagination-position': PaginationPosition,
		'predefined-settings': PredefinedSettings,
		'action-columns': TableActionColumns,
		'action-columns-performance': TableActionColumnPerformance,
		'render-cell': TableRenderCell,
		'settings-column-options': TableSettingsColumnOptions,
		'sort-data': TableSortData,
		'direction-aware-sort': TableDirectionAwareSort,
		'stateful-with-selection': TableStatefulWithSelection,
		'stateless-with-settings-menu': TableStatelessWithSettingsMenu,
		'stateful-with-single-selection': TableStatefulWithSingleSelection,
		stateless: TableStateless,
		'stateless-async': TableStatelessAsync,
		'stateless-with-selection': TableStatelessWithSelection,
		'stateless-with-single-selection': TableStatelessWithSingleSelection,
		'sticky-header': TableStickyHeader,
		'with-footer': TableWithFooter,
		'with-pagination': TableWithPagination,
	},
};

import type { Generic } from 'adopted-style-sheets';

import type { PropLabel, PropTableCallbacks, PropTableData, PropTableDataFoot, PropTableSelection, TableHeaderCells } from '../props';
import type { KoliBriTableDataType, KoliBriTableSelection } from '../types';
import type { PropTableHeaderCells } from '../props/table-header-cells';

type RequiredProps = PropLabel & PropTableData & PropTableHeaderCells;

type OptionalProps = {
	minWidth: string;
} & PropTableCallbacks &
	PropTableDataFoot &
	PropTableSelection;

type RequiredStates = {
	headerCells: TableHeaderCells;
	data: KoliBriTableDataType[];
} & PropLabel;

type OptionalStates = {
	minWidth: string;
	dataFoot: KoliBriTableDataType[];
	selection: KoliBriTableSelection;
} & PropTableCallbacks;

export type TableStatelessProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type TableStatelessStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type TableStatelessAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

import type { Generic } from 'adopted-style-sheets';
import type { PropLabel, PropTableCallbacks, PropTableData, PropTableDataFoot, PropTableSelection, TableHeaderCells } from '../props';
import type { PropMinWidth } from '../props/min-width';
import type { PropTableHeaderCells } from '../props/table-header-cells';
import type { KoliBriTableDataType, KoliBriTableSelection } from '../types';
import type { PropTableSettings } from '../props/table-settings';
import type { PropHasSettingsMenu } from '../props/has-settings-menu';

type RequiredProps = PropLabel & PropMinWidth & PropTableData & PropTableHeaderCells;

type OptionalProps = PropTableCallbacks & PropTableDataFoot & PropTableSelection & PropTableSettings & PropHasSettingsMenu;

type RequiredStates = {
	headerCells: TableHeaderCells;
	data: KoliBriTableDataType[];
} & PropLabel &
	PropMinWidth;

type OptionalStates = {
	dataFoot: KoliBriTableDataType[];
	selection: KoliBriTableSelection;
} & PropTableCallbacks &
	PropTableSettings &
	PropHasSettingsMenu;

export type TableStatelessProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type TableStatelessStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type TableStatelessAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

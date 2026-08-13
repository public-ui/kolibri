import type { Generic } from 'adopted-style-sheets';
import type {
	PropAriaLabelledby,
	PropLabel,
	PropTableCallbacks,
	PropTableData,
	PropTableDataFoot,
	PropTableSelection,
	PropVariantClassName,
	TableHeaderCells,
} from '../props';
import type { PropHasSettingsMenu } from '../props/has-settings-menu';
import type { PropTableHeaderCells } from '../props/table-header-cells';
import type { KoliBriTableDataType, KoliBriTableSelection } from '../types';

type RequiredProps = PropLabel & PropTableData & PropTableHeaderCells;

type OptionalProps = {
	loading: boolean;
} & PropAriaLabelledby &
	PropTableCallbacks &
	PropTableDataFoot &
	PropTableSelection &
	PropHasSettingsMenu;

type RequiredStates = {
	headerCells: TableHeaderCells;
	data: KoliBriTableDataType[];
} & PropLabel;

type OptionalStates = {
	dataFoot: KoliBriTableDataType[];
	fixedCols: [number, number];
	loading: boolean;
	selection: KoliBriTableSelection;
} & PropHasSettingsMenu &
	PropVariantClassName &
	PropTableCallbacks;

export type TableStatelessProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type TableStatelessStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type TableStatelessAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

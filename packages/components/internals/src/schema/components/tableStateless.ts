import type { Generic } from 'adopted-style-sheets';
import type {
	PropAriaLabelledby,
	PropLabelLangSegments,
	PropTableCallbacks,
	PropTableData,
	PropTableDataFoot,
	PropTableSelection,
	PropVariantClassName,
	TableHeadersPropType,
} from '../props';
import type { PropHasSettingsMenu } from '../props/has-settings-menu';
import type { KoliBriTableDataType, KoliBriTableSelection } from '../types';
import type { KoliBriTableHeaders } from './table';

type RequiredProps = {
	headers: TableHeadersPropType;
} & PropLabelLangSegments &
	PropTableData;

type OptionalProps = {
	loading: boolean;
} & PropAriaLabelledby &
	PropTableCallbacks &
	PropTableDataFoot &
	PropTableSelection &
	PropHasSettingsMenu;

type RequiredStates = {
	data: KoliBriTableDataType[];
	headers: KoliBriTableHeaders;
} & PropLabelLangSegments;

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

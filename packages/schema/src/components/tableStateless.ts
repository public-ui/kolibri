import type { Generic } from 'adopted-style-sheets';

import type { PropLabel, PropTableData, TableDataPropType } from '../props';
import type { Stringified } from '../types';
import type { KoliBriTableHeaders } from './table';

type RequiredProps = {
	headers: Stringified<KoliBriTableHeaders>;
} & PropTableData &
	PropLabel;

type OptionalProps = {
	dataFoot: TableDataPropType;
	minWidth: string;
};
type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;

export type TableStatelessProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type TableStatelessStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type TableStatelessAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

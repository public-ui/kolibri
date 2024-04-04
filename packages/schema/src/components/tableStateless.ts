import type { Generic } from 'adopted-style-sheets';

import type { PropLabel, PropTableData, PropTableDataFoot } from '../props';
import type { Stringified } from '../types';
import type { KoliBriTableDataType, KoliBriTableHeaders } from './table';

type RequiredProps = {
	headers: Stringified<KoliBriTableHeaders>;
} & PropTableData &
	PropLabel;

type OptionalProps = {
	minWidth: string;
} & PropTableDataFoot;

type RequiredStates = {
	headers: KoliBriTableHeaders;
	data: KoliBriTableDataType[];
} & PropLabel;

type OptionalStates = {
	minWidth: string;
	dataFoot: KoliBriTableDataType[];
};

export type TableStatelessProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type TableStatelessStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type TableStatelessAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

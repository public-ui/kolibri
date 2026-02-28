import type { Generic } from 'adopted-style-sheets';

import type { PropLabel } from '../props';

type RequiredProps = {
	max: number;
	unit: string;
	value: number;
} & PropLabel;

type OptionalProps = {
	high: number;
	low: number;
	min: number;
	optimum: number;
};

type RequiredStates = RequiredProps & {
	liveValue: number;
};

type OptionalStates = {
	unit: string;
};

export type MeterProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type MeterStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type MeterAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

import type { Generic } from 'adopted-style-sheets';

import type { PropLabel, PropVariantProgress } from '../props';

type RequiredProps = {
	max: number;
	value: number;
};
type OptionalProps = {
	unit: string;
} & PropLabel &
	PropVariantProgress;

type RequiredStates = RequiredProps & {
	liveValue: number;
};
type OptionalStates = {
	unit: string;
} & PropLabel &
	PropVariantProgress;

export type ProgressProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type ProgressStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type ProgressAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

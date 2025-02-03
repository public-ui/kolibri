import type { Generic } from 'adopted-style-sheets';

import type { PropLabel } from '../props';
import type { KoliBriProgressVariantType } from '../types';

type RequiredProps = {
	max: number;
	value: number;
};
type OptionalProps = {
	unit: string;
	variant: KoliBriProgressVariantType;
} & PropLabel;

type RequiredStates = RequiredProps & {
	liveValue: number;
};
type OptionalStates = {
	unit: string;
	variant: KoliBriProgressVariantType;
} & PropLabel;

export type ProgressProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type ProgressStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type ProgressAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

import { Generic } from '@a11y-ui/core';

import { KoliBriProgressVariantType } from '../../types/progress';
import { PropLabel } from '../../types/props/label';

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

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

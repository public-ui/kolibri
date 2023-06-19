import { Generic } from '@a11y-ui/core';
import { KoliBriProgressType } from '../../components';
import { PropLabel } from '../../types/props';

type RequiredProps = {
	max: number;
	value: number;
};
type OptionalProps = {
	/**
	 * @deprecated
	 */
	type: KoliBriProgressType;
	unit: string;
	variant: KoliBriProgressType;
} & PropLabel;

type RequiredStates = RequiredProps & {
	liveValue: number;
};
type OptionalStates = {
	unit: string;
	variant: KoliBriProgressType;
} & PropLabel;

export type KoliBriProgressStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriProgressAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

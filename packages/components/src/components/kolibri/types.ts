import { Generic } from '@a11y-ui/core';

import { Stringified } from '../../types/common';
import { PropColor } from '../../types/props/color';

type RequiredProps = unknown;
type OptionalProps = {
	animate: boolean;
	color: Stringified<PropColor>;
	labeled: boolean;
};

type RequiredStates = {
	animate: boolean;
	color: {
		red: number;
		green: number;
		blue: number;
	};
	labeled: boolean;
};
type OptionalStates = unknown;

export type KoliBriKolibriStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriKolibriAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

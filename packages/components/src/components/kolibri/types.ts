import type { Generic } from 'adopted-style-sheets';

import { Stringified } from '../../types/common';
import { PropColor } from '../../types/props/color';

type RequiredProps = NonNullable<unknown>;
type OptionalProps = {
	color: Stringified<PropColor>;
	labeled: boolean;
};

type RequiredStates = {
	color: {
		red: number;
		green: number;
		blue: number;
	};
	labeled: boolean;
};
type OptionalStates = NonNullable<unknown>;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

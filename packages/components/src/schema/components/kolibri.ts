import type { Generic } from 'adopted-style-sheets';

import type { PropColor } from '../props';
import type { Stringified } from '../types';
import type { Members } from '../types/members';

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

export type KolibriProps = Members<RequiredProps, OptionalProps>;
export type KolibriStates = Members<RequiredStates, OptionalStates>;
export type KolibriAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

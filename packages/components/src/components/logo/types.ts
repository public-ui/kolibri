import type { Generic } from 'adopted-style-sheets';

import type { Bundesamt, Bundesanstalt, Bundesministerium } from '../../enums/bund';

type RequiredProps = {
	org: Bundesministerium | Bundesamt | Bundesanstalt;
};
type OptionalProps = NonNullable<unknown>;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

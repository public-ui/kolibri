import type { Generic } from 'adopted-style-sheets';

import { Bundesamt, Bundesanstalt, Bundesministerium } from '../../enums/bund';

type RequiredProps = {
	org: Bundesministerium | Bundesamt | Bundesanstalt;
};
type OptionalProps = {
	abbr: Bundesministerium | Bundesamt | Bundesanstalt;
};

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

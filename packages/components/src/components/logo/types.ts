import { Generic } from '@a11y-ui/core';

import { Bundesamt, Bundesanstalt, Bundesministerium } from '../../enums/bund';

type RequiredProps = {
	org: Bundesministerium | Bundesamt | Bundesanstalt;
};
type OptionalProps = {
	abbr: Bundesministerium | Bundesamt | Bundesanstalt;
};

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;

export type KoliBriLogoStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriLogoAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

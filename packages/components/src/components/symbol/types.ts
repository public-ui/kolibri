import { Generic } from '@a11y-ui/core';

import { PropAriaLabel } from '../../types/props/aria-label';
import { PropLabel } from '../../types/props/label';

type RequiredProps = {
	symbol: string;
};
type OptionalProps = PropAriaLabel & PropLabel;
export type KoliBriSymbolProps = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;

export type KoliBriSymbolStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriSymbolAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

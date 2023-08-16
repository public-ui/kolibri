import { Generic } from '@a11y-ui/core';

import { PropAriaLabel } from '../../types/props/aria-label';
import { PropLabel } from '../../types/props/label';

type RequiredProps = {
	symbol: string;
};
type OptionalProps = PropAriaLabel & PropLabel;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps;
type OptionalStates = PropLabel;

export type Statest = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

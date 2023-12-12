import type { Generic } from 'adopted-style-sheets';

import { PropLabel } from '../../types/props/label';
import { PropTooltipAlign } from '../../types/props/tooltip-align';

type RequiredProps = PropLabel;
type OptionalProps = PropTooltipAlign;

type RequiredStates = RequiredProps & OptionalProps;
type OptionalStates = NonNullable<unknown>;

export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;
export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

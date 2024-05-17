import type { Generic } from 'adopted-style-sheets';

import type { PropAccessKey, PropAlign, PropId, PropLabel } from '../props';

type RequiredProps = PropLabel;
type OptionalProps = PropAccessKey & PropAlign & PropId;

type RequiredStates = PropLabel & PropAlign;
type OptionalStates = PropAccessKey & PropId;

export type TooltipProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type TooltipStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type TooltipAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

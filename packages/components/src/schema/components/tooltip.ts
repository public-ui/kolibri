import type { Generic } from 'adopted-style-sheets';

import type { PropAlign, PropBadgeText, PropId, PropLabel } from '../props';

type RequiredProps = PropLabel;
type OptionalProps = PropBadgeText & PropAlign & PropId;

type RequiredStates = PropLabel & PropAlign;
type OptionalStates = PropBadgeText & PropId;

export type TooltipProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type TooltipStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type TooltipAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

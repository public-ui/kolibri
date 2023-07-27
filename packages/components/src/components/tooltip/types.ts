import { Generic } from '@a11y-ui/core';

import { Align } from '../../types/props/align';
import { PropLabel } from '../../types/props/label';
import { PropId } from '../../types/props/id';

type RequiredProps = PropLabel;
type OptionalProps = {
	align: Align;
} & PropId;
export type KoliBriTooltipProps = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps & OptionalProps;
type OptionalStates = unknown;

export type KoliBriTooltipStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriTooltipAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

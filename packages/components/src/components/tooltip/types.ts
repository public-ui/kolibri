import { Generic } from '@a11y-ui/core';

import { AlignPropType } from '../../types/props/align';
import { PropId } from '../../types/props/id';
import { PropLabel } from '../../types/props/label';

type RequiredProps = PropLabel;
type OptionalProps = {
	align: AlignPropType;
} & PropId;
export type KoliBriTooltipProps = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps & OptionalProps;
type OptionalStates = unknown;

export type KoliBriTooltipStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriTooltipAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

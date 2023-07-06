import { Generic } from '@a11y-ui/core';

import { Align } from '../../types/props/align';
import { PropLabel } from '../../types/props/label';

type RequiredProps = PropLabel & {
	id: string;
};
type OptionalProps = {
	align: Align;
};
export type KoliBriTooltipProps = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps & OptionalProps;
type OptionalStates = unknown;

export type KoliBriTooltipStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriTooltipAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

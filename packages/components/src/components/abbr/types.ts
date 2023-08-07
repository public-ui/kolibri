import { Generic } from '@a11y-ui/core';

import { PropLabel } from '../../types/props/label';
import { PropTooltipAlign } from '../../types/props/tooltip-align';

type RequiredProps = unknown;
type OptionalProps = {
	/**
	 * @deprecated Use label.
	 */
	title: string;
} & PropLabel &
	PropTooltipAlign;

type RequiredStates = RequiredProps & Omit<OptionalProps, 'title'>;
type OptionalStates = unknown;

export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;
export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

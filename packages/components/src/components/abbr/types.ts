import type { Generic } from 'adopted-style-sheets';

import { PropLabel } from '../../types/props/label';
import { PropTooltipAlign } from '../../types/props/tooltip-align';

type RequiredProps = NonNullable<unknown>;
type OptionalProps = {
	/**
	 * @deprecated Use label.
	 */
	title: string;
} & PropLabel &
	PropTooltipAlign;

type RequiredStates = RequiredProps & Omit<OptionalProps, 'title'>;
type OptionalStates = NonNullable<unknown>;

export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;
export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

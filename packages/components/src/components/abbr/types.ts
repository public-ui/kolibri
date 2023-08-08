import { Generic } from '@a11y-ui/core';

import { AlignPropType } from '../../types/props/align';
import { PropLabel } from '../../types/props/label';

type RequiredProps = unknown;
type OptionalProps = {
	/**
	 * @deprecated Use label.
	 */
	title: string;
	tooltipAlign: AlignPropType;
} & PropLabel;

type RequiredStates = RequiredProps & Omit<OptionalProps, 'title'>;
type OptionalStates = unknown;

export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;
export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

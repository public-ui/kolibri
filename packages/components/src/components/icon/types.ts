import type { Generic } from 'adopted-style-sheets';

import { PropAriaLabel } from '../../types/props/aria-label';
import { PropLabel } from '../../types/props/label';

type RequiredProps = NonNullable<unknown>;
type OptionalProps = {
	icons: string; // @todo V2: Make required
	icon: string;
	part: string;
} & PropAriaLabel &
	PropLabel;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = Omit<RequiredProps, 'icon'>;
type OptionalStates = OptionalProps;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

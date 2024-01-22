import type { Generic } from 'adopted-style-sheets';
import type { PropLabel } from '../props';

type RequiredProps = {
	icons: string;
} & PropLabel;
type OptionalProps = NonNullable<unknown>;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;

export type IconProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type IconStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type IconAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

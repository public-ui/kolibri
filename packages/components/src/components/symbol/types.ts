import type { Generic } from 'adopted-style-sheets';
import { PropLabel } from '../../types/props/label';

type RequiredProps = {
	symbol: string;
} & PropLabel;
type OptionalProps = NonNullable<unknown>;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps;
type OptionalStates = NonNullable<unknown>;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

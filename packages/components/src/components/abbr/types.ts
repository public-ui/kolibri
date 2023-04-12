import { Generic } from '@a11y-ui/core';
import { Alignment } from '../../components';

type RequiredProps = {
	title: string;
};
type OptionalProps = {
	tooltipAlign: Alignment;
};

type RequiredStates = RequiredProps & OptionalProps;
type OptionalStates = unknown;

export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;
export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

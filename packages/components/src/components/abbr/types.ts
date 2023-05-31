import { Generic } from '@a11y-ui/core';
import { Alignment } from '../../components';

type RequiredProps = unknown;
type OptionalProps = {
	label: string;
	title: string;
	tooltipAlign: Alignment;
};

type RequiredStates = RequiredProps & { label: string; tooltipAlign: Alignment };
type OptionalStates = unknown;

export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;
export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

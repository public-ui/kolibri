import { Generic } from '@a11y-ui/core';
import { LinkProps, Stringified } from '../../components';

type RequiredProps = {
	ariaLabel: string;
	links: Stringified<LinkProps[]>;
};
type OptionalProps = unknown;

type RequiredStates = {
	ariaLabel: string;
	links: LinkProps[];
};
type OptionalStates = OptionalProps;

export type KoliBriSkipNavStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriSkipNavAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

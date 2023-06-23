import { Generic } from '@a11y-ui/core';
import { LinkProps, Stringified } from '../../components';

type RequiredProps = {
	ariaLabel: string;
	links: Stringified<LinkProps[]>;
};
type OptionalProps = unknown;
export type KoliBriBreadcrumbProps = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	ariaLabel: string;
	links: LinkProps[];
};
type OptionalStates = OptionalProps;

export type KoliBriBreadcrumbStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriBreadcrumbAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

import { Generic } from '@a11y-ui/core';
import { LinkProps, Stringified } from '../../components';

export type BreadcrumbLinkProps = LinkProps & { _label: string };

type RequiredProps = {
	ariaLabel: string;
	links: Stringified<BreadcrumbLinkProps[]>;
};
type OptionalProps = unknown;
export type KoliBriBreadcrumbProps = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	ariaLabel: string;
	links: BreadcrumbLinkProps[];
};
type OptionalStates = OptionalProps;

export type KoliBriBreadcrumbStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriBreadcrumbAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

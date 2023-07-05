import { Generic } from '@a11y-ui/core';
import { LinkProps, Stringified } from '../../components';
import { PropLabel } from '../../types/props';
import { PropAriaLabel } from '../../types/props';

export type BreadcrumbLinkProps = LinkProps & { _label: string };

type RequiredProps = {
	links: Stringified<BreadcrumbLinkProps[]>;
};
type OptionalProps = PropAriaLabel & PropLabel;
export type KoliBriBreadcrumbProps = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	links: BreadcrumbLinkProps[];
} & PropLabel;
type OptionalStates = OptionalProps;

export type KoliBriBreadcrumbStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriBreadcrumbAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

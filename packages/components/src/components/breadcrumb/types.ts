import { Generic } from '@a11y-ui/core';

import { LinkProps } from '../../types/button-link';
import { Stringified } from '../../types/common';
import { PropAriaLabel } from '../../types/props/aria-label';
import { PropLabel } from '../../types/props/label';

/**
 * TODO: All LinkProps as Link-List (_links) does not have a _label
 *       with expert-slot!
 */
export type BreadcrumbLinkProps = LinkProps & PropLabel;

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

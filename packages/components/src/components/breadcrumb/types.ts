import { Generic } from '@a11y-ui/core';

import { Stringified } from '../../types/common';
import { PropAriaLabel } from '../../types/props/aria-label';
import { LabelProp, PropLabel } from '../../types/props/label';
import { LinkProps } from '../link/types';

/**
 * TODO: All LinkProps as Link-List (_links) does not have a _label
 *       with expert-slot!
 */
export type BreadcrumbLinkProps = LinkProps & LabelProp;

type RequiredProps = {
	links: Stringified<BreadcrumbLinkProps[]>;
};
type OptionalProps = PropAriaLabel & PropLabel;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	links: BreadcrumbLinkProps[];
} & PropLabel;
type OptionalStates = OptionalProps;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

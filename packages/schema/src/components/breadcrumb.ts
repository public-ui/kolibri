import type { Generic } from 'adopted-style-sheets';

import type { LabelProp, PropLabel } from '../props';
import type { Stringified } from '../types';
import type { LinkProps } from './link';

/**
 * TODO: All LinkProps as Link-List (_links) does not have a _label
 *       with expert-slot!
 */
export type BreadcrumbLinkProps = LinkProps & LabelProp;

type RequiredProps = {
	links: Stringified<BreadcrumbLinkProps[]>;
} & PropLabel;
type OptionalProps = NonNullable<unknown>;

type RequiredStates = {
	links: BreadcrumbLinkProps[];
} & PropLabel;
type OptionalStates = OptionalProps;

export type BreadcrumbProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type BreadcrumbStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type BreadcrumbAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

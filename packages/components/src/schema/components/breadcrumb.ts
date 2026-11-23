import type { Generic } from 'adopted-style-sheets';

import type { PropLabel } from '../props';
import type { Stringified } from '../types';
import type { Members } from '../types/members';
import type { LinkProps } from './link';

/**
 * TODO: All LinkProps as Link-List (_links) does not have a _label
 *       with expert-slot!
 */
export type BreadcrumbLinkProps = LinkProps;

type RequiredProps = {
	links: Stringified<BreadcrumbLinkProps[]>;
} & PropLabel;
type OptionalProps = NonNullable<unknown>;

type RequiredStates = {
	links: BreadcrumbLinkProps[];
} & PropLabel;
type OptionalStates = OptionalProps;

export type BreadcrumbProps = Members<RequiredProps, OptionalProps>;
export type BreadcrumbStates = Members<RequiredStates, OptionalStates>;
export type BreadcrumbAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

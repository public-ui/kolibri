import type { Generic } from 'adopted-style-sheets';

import { Stringified } from '../../types/common';
import { LabelProp, PropLabel } from '../../types/props/label';
import { LinkProps } from '../link/types';

/**
 * TODO: All LinkProps as Link-List (_links) does not have a _label
 *       with expert-slot!
 */
export type BreadcrumbLinkProps = LinkProps & LabelProp;

type RequiredProps = {
	links: Stringified<BreadcrumbLinkProps[]>;
} & PropLabel;
type OptionalProps = NonNullable<unknown>;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	links: BreadcrumbLinkProps[];
} & PropLabel;
type OptionalStates = OptionalProps;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

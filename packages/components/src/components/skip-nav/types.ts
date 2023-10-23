import { Generic } from '@a11y-ui/core';

import { Stringified } from '../../types/common';
import { PropLabel } from '../../types/props/label';
import { LinkProps } from '../link/types';

type RequiredProps = {
	links: Stringified<LinkProps[]>;
} & PropLabel;
type OptionalProps = NonNullable<unknown>;

type RequiredStates = {
	links: LinkProps[];
} & PropLabel;
type OptionalStates = OptionalProps;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

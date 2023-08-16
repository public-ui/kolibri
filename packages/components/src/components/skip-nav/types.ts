import { Generic } from '@a11y-ui/core';

import { Props as LinkProps } from '../link/types';
import { Stringified } from '../../types/common';
import { PropAriaLabel } from '../../types/props/aria-label';
import { PropLabel } from '../../types/props/label';

type RequiredProps = {
	links: Stringified<LinkProps[]>;
};
type OptionalProps = PropAriaLabel & PropLabel;

type RequiredStates = {
	links: LinkProps[];
} & PropLabel;
type OptionalStates = OptionalProps;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

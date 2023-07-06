import { Generic } from '@a11y-ui/core';

import { LinkProps } from '../../types/button-link';
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

export type KoliBriSkipNavStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriSkipNavAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

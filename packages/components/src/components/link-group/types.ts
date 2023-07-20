import { Generic } from '@a11y-ui/core';

import { LinkProps } from '../../types/button-link';
import { Stringified } from '../../types/common';
import { HeadingLevel } from '../../types/heading-level';
import { Orientation } from '../../types/orientation';
import { PropAriaLabel } from '../../types/props/aria-label';
import { PropLabel } from '../../types/props/label';

export type ListStyleType =
	| 'disc'
	| 'circle'
	| 'square'
	| 'none'
	| 'decimal'
	| 'decimal-leading-zero'
	| 'lower-alpha'
	| 'lower-greek'
	| 'lower-latin'
	| 'lower-roman'
	| 'upper-alpha'
	| 'upper-latin'
	| 'upper-roman';

type RequiredProps = {
	links: Stringified<LinkProps[]>;
};
type OptionalProps = {
	heading: string;
	level: HeadingLevel;
	listStyleType: ListStyleType;
	ordered: boolean;
	orientation: Orientation;
} & PropAriaLabel &
	PropLabel;

type RequiredStates = {
	links: LinkProps[];
	listStyleType: ListStyleType;
	orientation: Orientation;
} & PropLabel;
type OptionalStates = {
	heading: string;
	level: HeadingLevel;
	ordered: boolean;
};

export type KoliBriLinkGroupStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriLinkGroupAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

import type { Generic } from 'adopted-style-sheets';

import type { PropLabel } from '../props';
import type { Orientation, Stringified } from '../types';
import type { LinkProps } from './link';

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
} & PropLabel;
type OptionalProps = {
	listStyleType: ListStyleType;
	orientation: Orientation;
};

type RequiredStates = {
	links: LinkProps[];
	listStyleType: ListStyleType;
	orientation: Orientation;
} & PropLabel;
type OptionalStates = NonNullable<unknown>;

export type LinkGroupProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type LinkGroupStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type LinkGroupAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

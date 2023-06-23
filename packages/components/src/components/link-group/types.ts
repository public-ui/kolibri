import { Generic } from '@a11y-ui/core';
import { HeadingLevel, LinkProps, Orientation, Stringified } from '../../components';

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
	ariaLabel: string;
	links: Stringified<LinkProps[]>;
};
type OptionalProps = {
	heading: string;
	level: HeadingLevel;
	listStyleType: ListStyleType;
	ordered: boolean;
	orientation: Orientation;
};

type RequiredStates = {
	ariaLabel: string;
	links: LinkProps[];
	listStyleType: ListStyleType;
	orientation: Orientation;
};
type OptionalStates = {
	heading: string;
	level: HeadingLevel;
	ordered: boolean;
};

export type KoliBriLinkGroupStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriLinkGroupAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

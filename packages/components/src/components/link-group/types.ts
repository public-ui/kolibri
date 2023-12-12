import { Generic } from 'adopted-style-sheets';

import { Stringified } from '../../types/common';
import { Orientation } from '../../types/orientation';
import { PropLabel } from '../../types/props/label';
import { LinkProps } from '../link/types';

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

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

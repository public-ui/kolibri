import type { Generic } from 'adopted-style-sheets';

import type { PropLabel } from '../props';
import type { Stringified } from '../types';
import type { Members } from '../types/members';
import type { LinkProps } from './link';

type RequiredProps = {
	links: Stringified<LinkProps[]>;
} & PropLabel;
type OptionalProps = NonNullable<unknown>;

type RequiredStates = {
	links: LinkProps[];
} & PropLabel;
type OptionalStates = OptionalProps;

export type SkipNavProps = Members<RequiredProps, OptionalProps>;
export type SkipNavStates = Members<RequiredStates, OptionalStates>;
export type SkipNavAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

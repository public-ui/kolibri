import type { Generic } from 'adopted-style-sheets';

import type { PropLabel } from '../props';
import type { Stringified } from '../types';
import type { LinkProps } from './link';

type RequiredProps = {
	links: Stringified<LinkProps[]>;
} & PropLabel;
type OptionalProps = NonNullable<unknown>;

export type SkipNavProps = Generic.Element.Members<RequiredProps, OptionalProps>;

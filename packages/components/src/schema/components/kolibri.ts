import type { Generic } from 'adopted-style-sheets';

import type { PropColor } from '../props';
import type { Stringified } from '../types';

type RequiredProps = NonNullable<unknown>;
type OptionalProps = {
	color: Stringified<PropColor>;
	labeled: boolean;
};

export type KolibriProps = Generic.Element.Members<RequiredProps, OptionalProps>;

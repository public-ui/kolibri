import type { Generic } from 'adopted-style-sheets';

import type { PropColor, PropLabel } from '../props';
import type { KoliBriIconsProp, Stringified } from '../types';
import type { InternalButtonProps } from './button';

type RequiredProps = PropLabel;
type OptionalProps = {
	icons: Stringified<KoliBriIconsProp>;
	color: Stringified<PropColor>;
	smartButton: Stringified<InternalButtonProps>;
};

export type BadgeProps = Generic.Element.Members<RequiredProps, OptionalProps>;

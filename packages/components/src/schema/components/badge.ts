import type { ComponentPropsOptional, ComponentPropsRequired } from '../../internal/functional-components/generic-types';
import type { PropColor, PropLabelLangSegments } from '../props';
import type { KoliBriIconsProp, Stringified } from '../types';
import type { InternalButtonProps } from './button';

type RequiredProps = PropLabelLangSegments;
type OptionalProps = {
	icons: Stringified<KoliBriIconsProp>;
	color: Stringified<PropColor>;
	smartButton: Stringified<InternalButtonProps>;
};

export type BadgeProps = ComponentPropsRequired<RequiredProps> & ComponentPropsOptional<OptionalProps>;

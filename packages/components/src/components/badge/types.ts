import { Generic } from '@a11y-ui/core';

import { ButtonProps } from '../../types/button-link';
import { Stringified } from '../../types/common';
import { KoliBriIconProp } from '../../types/icon';
import { ColorPair, PropColor } from '../../types/props/color';
import { PropHideLabel } from '../../types/props/hide-label';
import { PropLabel } from '../../types/props/label';

type RequiredProps = PropLabel;
type OptionalProps = {
	color: Stringified<PropColor>;
	hideLabel: boolean;
	icon: Stringified<KoliBriIconProp>;
	/**
	 * @deprecated
	 */
	iconOnly: boolean;
	smartButton: Stringified<ButtonProps>;
} & PropHideLabel;
export type KoliBriBadgeProps = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	color: ColorPair;
} & PropLabel;
type OptionalStates = {
	smartButton: ButtonProps;
};
export type KoliBriBadgeStates = Generic.Element.Members<RequiredStates, OptionalStates>;

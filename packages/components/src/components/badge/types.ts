import { Generic } from '@a11y-ui/core';

import { ButtonProps } from '../../types/button-link';
import { Stringified } from '../../types/common';
import { KoliBriIconProp } from '../../types/icon';
import { ColorPair, PropColor } from '../../types/props/color';
import { PropLabel } from '../../types/props/label';
import { HideLabelPropType } from '../../types/props/hide-label';

type RequiredProps = PropLabel;
type OptionalProps = {
	color: Stringified<PropColor>;
	/**
	 * @deprecated
	 */
	hideLabel: HideLabelPropType;
	icon: Stringified<KoliBriIconProp>;
	/**
	 * @deprecated
	 */
	iconOnly: boolean;
	smartButton: Stringified<ButtonProps>;
};
export type KoliBriBadgeProps = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	color: ColorPair;
} & PropLabel;
type OptionalStates = {
	smartButton: ButtonProps;
};
export type KoliBriBadgeStates = Generic.Element.Members<RequiredStates, OptionalStates>;

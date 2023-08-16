import { Generic } from '@a11y-ui/core';

import { Props as ButtonProps } from '../button/types';
import { Stringified } from '../../types/common';
import { ColorPair, PropColor } from '../../types/props/color';
import { PropHideLabel } from '../../types/props/hide-label';
import { PropLabel } from '../../types/props/label';
import { PropIcon } from '../../types/props/icon';

type RequiredProps = PropLabel;
type OptionalProps = {
	color: Stringified<PropColor>;
	smartButton: Stringified<ButtonProps>;
	/**
	 * @deprecated
	 */
	iconOnly: boolean;
} & PropHideLabel &
	PropIcon;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps & {
	color: ColorPair;
};
type OptionalStates = OptionalProps;
export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

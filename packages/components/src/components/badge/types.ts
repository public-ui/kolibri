import { Generic } from '@a11y-ui/core';

import { Stringified } from '../../types/common';
import { ColorPair, PropColor } from '../../types/props/color';
import { PropHideLabel } from '../../types/props/hide-label';
import { PropIcon } from '../../types/props/icon';
import { PropLabel } from '../../types/props/label';
import { Props as ButtonProps } from '../button/types';

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

type RequiredStates = {
	color: ColorPair;
};
type OptionalStates = {
	smartButton: ButtonProps;
};

type RequiredWatchers = RequiredStates;
type OptionalWatchers = OptionalStates;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.Component &
	Generic.Element.Members<RequiredProps, OptionalProps> &
	Generic.Element.Watchers<RequiredWatchers, OptionalWatchers> & {
		readonly state: Generic.Element.Members<RequiredStates, OptionalStates>;
	};

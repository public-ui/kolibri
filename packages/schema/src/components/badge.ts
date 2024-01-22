import type { Generic } from 'adopted-style-sheets';

import type { ColorPair, PropColor, PropIcons, PropLabel } from '../props';
import type { Stringified } from '../types';
import type { ButtonProps } from './button';

type RequiredProps = PropLabel;
type OptionalProps = {
	color: Stringified<PropColor>;
	smartButton: Stringified<ButtonProps>;
} & PropIcons;

type RequiredStates = {
	color: ColorPair;
};
type OptionalStates = {
	smartButton: ButtonProps;
};

type RequiredWatchers = RequiredStates;
type OptionalWatchers = OptionalStates;

export type BadgeProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type BadgeStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type BadgeAPI = Generic.Element.Component &
	Generic.Element.Members<RequiredProps, OptionalProps> &
	Generic.Element.Watchers<RequiredWatchers, OptionalWatchers> & {
		readonly state: Generic.Element.Members<RequiredStates, OptionalStates>;
	};

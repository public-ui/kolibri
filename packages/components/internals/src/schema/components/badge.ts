import type { Generic } from 'adopted-style-sheets';

import type { ColorPair, PropColor, PropLabelLangSegments } from '../props';
import type { KoliBriIconsProp, Stringified } from '../types';
import type { InternalButtonProps } from './button';

type RequiredProps = PropLabelLangSegments;
type OptionalProps = {
	icons: Stringified<KoliBriIconsProp>;
	color: Stringified<PropColor>;
	smartButton: Stringified<InternalButtonProps>;
};

type RequiredStates = {
	color: ColorPair;
};
type OptionalStates = {
	icons: KoliBriIconsProp;
	smartButton: InternalButtonProps;
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

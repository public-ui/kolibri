import type { ComponentPropsOptional, ComponentPropsRequired } from '../../internal/functional-components/generic-types';
import type { Callback } from '../enums';
import type { PropDisabled, PropHideLabel, PropLabelLangSegments, PropTooltipAlign } from '../props';
import type { EventCallback, EventValueOrEventCallback, KoliBriIconsProp, Stringified } from '../types';

export type KoliBriTabsCallbacks = {
	onCreate?: EventCallback<Event>;
} & {
	[Callback.onSelect]?: EventValueOrEventCallback<CustomEvent | KeyboardEvent | MouseEvent | PointerEvent, number>;
};

export type KoliBriTabButtonCallbacks = {
	[Callback.onSelect]?: EventValueOrEventCallback<CustomEvent | KeyboardEvent | MouseEvent | PointerEvent, number>;
};
type RequiredTabButtonProps = PropLabelLangSegments;
type OptionalTabButtonProps = {
	icons: Stringified<KoliBriIconsProp>;
	on: KoliBriTabButtonCallbacks;
} & PropDisabled &
	PropHideLabel &
	PropTooltipAlign;
export type TabButtonProps = ComponentPropsRequired<RequiredTabButtonProps> & ComponentPropsOptional<OptionalTabButtonProps>;

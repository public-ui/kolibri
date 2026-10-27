import type { Generic } from 'adopted-style-sheets';

import type { Callback } from '../enums';
import type { PropAlign, PropDisabled, PropHideLabel, PropLabel, PropTabBehavior, PropTooltipAlign } from '../props';
import type { PropHasCreateButton } from '../props/has-create-button';
import type { EventCallback, EventValueOrEventCallback, KoliBriIconsProp, Stringified } from '../types';

export type KoliBriTabsCallbacks = {
	onCreate?: EventCallback<Event>;
} & {
	[Callback.onSelect]?: EventValueOrEventCallback<CustomEvent | KeyboardEvent | MouseEvent | PointerEvent, number>;
};

type KoliBriTabButtonCallbacks = {
	[Callback.onSelect]?: EventValueOrEventCallback<CustomEvent | KeyboardEvent | MouseEvent | PointerEvent, number>;
};
type RequiredTabButtonProps = PropLabel;
type OptionalTabButtonProps = {
	icons: Stringified<KoliBriIconsProp>;
	on: KoliBriTabButtonCallbacks;
} & PropDisabled &
	PropHideLabel &
	PropTooltipAlign;
export type TabButtonProps = Generic.Element.Members<RequiredTabButtonProps, OptionalTabButtonProps>;

type RequiredProps = {
	tabs: Stringified<TabButtonProps[]>;
} & PropLabel;
type OptionalProps = {
	on: KoliBriTabsCallbacks;
	selected: number;
} & PropAlign &
	PropHasCreateButton &
	PropTabBehavior;

export type TabsProps = Generic.Element.Members<RequiredProps, OptionalProps>;

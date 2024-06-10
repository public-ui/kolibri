import type { Generic } from 'adopted-style-sheets';

import type { Events } from '../enums';
import type { PropAlign, PropDisabled, PropHideLabel, PropLabel, PropTooltipAlign } from '../props';
import type { EventCallback, EventValueOrEventCallback, KoliBriIconsProp, Stringified } from '../types';

export type KoliBriTabsCallbacks = {
	onCreate?:
		| EventCallback<Event>
		| {
				label: string;
				callback: EventCallback<Event>;
		  };
} & {
	[Events.onSelect]?: EventValueOrEventCallback<CustomEvent | KeyboardEvent | MouseEvent | PointerEvent, number>;
};

export type KoliBriTabButtonCallbacks = {
	[Events.onSelect]?: EventValueOrEventCallback<CustomEvent | KeyboardEvent | MouseEvent | PointerEvent, number>;
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
} & PropAlign;

type RequiredStates = {
	selected: number;
	tabs: TabButtonProps[];
} & PropLabel &
	PropAlign;
type OptionalStates = {
	on: KoliBriTabsCallbacks;
};

export type TabsProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type TabsStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type TabsAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

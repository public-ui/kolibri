import { Generic } from '@a11y-ui/core';
import { Align, KoliBriIconProp, Stringified } from '../../components';
import { PropHideLabel, PropLabel } from '../../types/props';
import { EventCallback, EventValueOrEventCallback } from '../../types/callbacks';
import { Events } from '../../enums/events';
import { PropAriaLabel } from '../../types/props';

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

type RequiredTabButtonProps = PropLabel;
type OptionalTabButtonProps = {
	disabled: boolean;
	icon: Stringified<KoliBriIconProp>;
	/**
	 * @deprecated use _hide-label
	 */
	iconOnly: boolean;
	tooltipAlign: Align;
} & PropHideLabel;
export type TabButtonProps = Generic.Element.Members<RequiredTabButtonProps, OptionalTabButtonProps>;

type RequiredProps = {
	tabs: Stringified<TabButtonProps[]>;
};
type OptionalProps = {
	on: KoliBriTabsCallbacks;
	tabsAlign: Align;
	selected: number;
} & PropAriaLabel &
	PropLabel;

type RequiredStates = {
	tabsAlign: Align;
	selected: number;
	tabs: TabButtonProps[];
} & PropLabel;
type OptionalStates = {
	on: KoliBriTabsCallbacks;
};

export type KoliBriTabsStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriTabsAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

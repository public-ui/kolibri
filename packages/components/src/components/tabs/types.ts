import { Generic } from '@a11y-ui/core';
import { Align, KoliBriIconProp, Stringified } from '../../components';
import { PropHideLabel } from '../../types/props';
import { EventCallback, EventValueOrEventCallback } from '../../types/callbacks';
import { Events } from '../../enums/events';

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

type RequiredTabButtonProps = {
	label: string;
};
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
	label: string;
	tabs: Stringified<TabButtonProps[]>;
};
type OptionalProps = {
	/**
	 * @deprecated use _label instead
	 */
	ariaLabel: string;
	on: KoliBriTabsCallbacks;
	tabsAlign: Align;
	selected: number;
};

type RequiredStates = {
	label: string;
	tabsAlign: Align;
	selected: number;
	tabs: TabButtonProps[];
};
type OptionalStates = {
	on: KoliBriTabsCallbacks;
};

export type KoliBriTabsStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriTabsAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

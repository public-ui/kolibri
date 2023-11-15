import { Generic } from '@a11y-ui/core';

import { Events } from '../../enums/events';
import { EventCallback, EventValueOrEventCallback } from '../../types/callbacks';
import { Stringified } from '../../types/common';
import { KoliBriIconsProp } from '../../types/icons';
import { PropAlign } from '../../types/props/align';
import { PropDisabled } from '../../types/props/disabled';
import { PropHideLabel } from '../../types/props/hide-label';
import { PropLabel } from '../../types/props/label';
import { PropTooltipAlign } from '../../types/props/tooltip-align';

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
	icons: Stringified<KoliBriIconsProp>;
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

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

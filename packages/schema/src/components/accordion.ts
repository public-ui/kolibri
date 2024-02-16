import type { Generic } from 'adopted-style-sheets';
import type { Events } from '../enums';
import type { HeadingLevel, PropLabel, PropOpen } from '../props';
import type { EventValueOrEventCallback } from '../types';

export type KoliBriAccordionCallbacks = {
	[Events.onClick]?: EventValueOrEventCallback<Event, boolean>;
};

type RequiredProps = PropLabel;
type OptionalProps = {
	level: HeadingLevel;
	on: KoliBriAccordionCallbacks;
} & PropOpen;

type RequiredStates = RequiredProps & PropLabel;
type OptionalStates = OptionalProps;

export type AccordionProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type AccordionStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type AccordionAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

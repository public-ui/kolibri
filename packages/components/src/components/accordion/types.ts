import { Generic } from '@a11y-ui/core';
import { HeadingLevel } from '../../components';
import { Events } from '../../enums/events';
import { EventValueOrEventCallback } from '../../types/callbacks';
import { PropOpen } from '../../types/props';

export type KoliBriAccordionCallbacks = {
	[Events.onClick]?: EventValueOrEventCallback<Event, boolean>;
};

type RequiredProps = {
	heading: string;
};
type OptionalProps = {
	level: HeadingLevel;
	on: KoliBriAccordionCallbacks;
} & PropOpen;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;

export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;
export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

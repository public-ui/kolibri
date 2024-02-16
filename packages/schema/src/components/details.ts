import type { Generic } from 'adopted-style-sheets';

import type { PropLabel, PropOpen } from '../props';
import type { EventValueOrEventCallback } from '../types';

export type EventCallbacks = {
	onToggle?: EventValueOrEventCallback<Event, boolean>;
};

type RequiredProps = PropLabel;
type OptionalProps = {
	on: EventCallbacks;
} & PropOpen;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;

export type DetailsProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type DetailsStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type DetailsAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

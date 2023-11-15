import { Generic } from '@a11y-ui/core';

import { EventValueOrEventCallback } from '../../types/callbacks';
import { PropLabel } from '../../types/props/label';
import { PropOpen } from '../../types/props/open';

export type EventCallbacks = {
	onToggle?: EventValueOrEventCallback<Event, boolean>;
};

type RequiredProps = PropLabel;
type OptionalProps = {
	on: EventCallbacks;
} & PropOpen;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

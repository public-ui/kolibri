import { Generic } from '@a11y-ui/core';

import { Events } from '../../enums/events';
import { EventValueOrEventCallback } from '../../types/callbacks';
import { HeadingLevel } from '../../types/heading-level';
import { PropOpen } from '../../types/props/open';

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

import type { Generic } from 'adopted-style-sheets';

import { Events } from '../../enums/events';
import { EventValueOrEventCallback } from '../../types/callbacks';
import { HeadingLevel } from '../../types/heading-level';
import { PropLabel } from '../../types/props/label';
import { PropOpen } from '../../types/props/open';

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

export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;
export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

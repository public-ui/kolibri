import { Generic } from '@a11y-ui/core';

import { Events } from '../../enums/events';
import { EventValueOrEventCallback } from '../../types/callbacks';
import { HeadingLevel } from '../../types/heading-level';
import { PropLabel } from '../../types/props/label';
import { PropOpen } from '../../types/props/open';

export type KoliBriAccordionCallbacks = {
	[Events.onClick]?: EventValueOrEventCallback<Event, boolean>;
};

type RequiredProps = NonNullable<unknown>;
type OptionalProps = {
	/**
	 * @deprecated Use label.
	 */
	heading: string;
	level: HeadingLevel;
	on: KoliBriAccordionCallbacks;
} & PropOpen &
	PropLabel; // PropLabel will become required in v2.

type RequiredStates = RequiredProps & PropLabel;
type OptionalStates = OptionalProps;

export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;
export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

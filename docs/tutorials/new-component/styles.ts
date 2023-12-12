/* Hier kommen alle Typen rein, die von der Komponente verwendet werden; 'States' und 'Props' werden in der Komponente mindestens benötigt. */

import type { Generic } from 'adopted-style-sheets';
import { Events } from '../../enums/events';
import { EventValueOrEventCallback } from '../../types/callbacks';
import { HeadingLevel } from '../../types/heading-level';

export type KoliBriNewComponentCallbacks = {
	[Events.onClick]?: EventValueOrEventCallback<Event, boolean>;
};

/**
 * API für NewComponent
 */
type RequiredProps = {
	heading: string;
};
type OptionalProps = {
	level: HeadingLevel;
	open: boolean;
	on: KoliBriNewComponentCallbacks;
};

export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;
export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

export type NewComponentAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

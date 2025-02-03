import type { Generic } from 'adopted-style-sheets';

import type { HeadingLevel, PropHasCloser, PropLabel } from '../props';
import type { EventCallback } from '../types';

export type KoliBriCardEventCallbacks = {
	onClose?: EventCallback<Event>;
};

type RequiredProps = PropLabel;
type OptionalProps = {
	level: HeadingLevel;
	on: KoliBriCardEventCallbacks;
} & PropHasCloser;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;

export type CardProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type CardStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type CardAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

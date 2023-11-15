import { Generic } from '@a11y-ui/core';

import { EventCallback } from '../../types/callbacks';
import { HeadingLevel } from '../../types/heading-level';
import { PropHasCloser } from '../../types/props/has-closer';
import { PropLabel } from '../../types/props/label';

export type KoliBriCardEventCallbacks = {
	onClose?: EventCallback<Event>;
};

type RequiredProps = PropLabel;
type OptionalProps = {
	level: HeadingLevel;
	on: KoliBriCardEventCallbacks;
} & PropHasCloser;

export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

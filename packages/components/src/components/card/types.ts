import { Generic } from '@a11y-ui/core';

import { HeadingLevel } from '../../types/heading-level';
import { PropHasFooter } from '../../types/props/has-footer';
import { PropLabel } from '../../types/props/label';
import { PropHasCloser } from '../../types/props/has-closer';
import { EventCallback } from '../../types/callbacks';

export type KoliBriCardEventCallbacks = {
	onClose?: EventCallback<Event>;
};

type RequiredProps = unknown;
type OptionalProps = {
	/**
	 * @deprecated Use _label instead.
	 */
	heading: string;
	/**
	 * @deprecated Use _label instead.
	 */
	headline: string;
	level: HeadingLevel;
	on: KoliBriCardEventCallbacks;
} & PropHasFooter &
	PropLabel & // TODO v2: PropLabel will become required
	PropHasCloser;

export type koliBriCardProps = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps & PropLabel;
type OptionalStates = OptionalProps;

export type KoliBriCardStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriCardAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

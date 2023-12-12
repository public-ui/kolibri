import type { Generic } from 'adopted-style-sheets';

import { EventCallback } from '../../types/callbacks';
import { HeadingLevel } from '../../types/heading-level';
import { PropHasCloser } from '../../types/props/has-closer';
import { PropHasFooter } from '../../types/props/has-footer';
import { PropLabel } from '../../types/props/label';

export type KoliBriCardEventCallbacks = {
	onClose?: EventCallback<Event>;
};

type RequiredProps = NonNullable<unknown>;
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

export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps & PropLabel;
type OptionalStates = OptionalProps;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

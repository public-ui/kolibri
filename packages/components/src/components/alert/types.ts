import { Generic } from '@a11y-ui/core';

import { EventCallback } from '../../types/callbacks';
import { HeadingLevel } from '../../types/heading-level';
import { PropAlert } from '../../types/props/alert';
import { PropHasCloser } from '../../types/props/has-closer';
import { PropLabel } from '../../types/props/label';

export type AlertType = 'default' | 'info' | 'success' | 'warning' | 'error';
export type AlertVariant = 'card' | 'msg';

export type KoliBriAlertEventCallbacks = {
	onClose?: EventCallback<Event>;
};

type RequiredAlertProps = NonNullable<unknown>;
type OptionalAlertProps = {
	/**
	 * @deprecated Use label.
	 */
	heading: string;
	level: HeadingLevel;
	on: KoliBriAlertEventCallbacks;
	type: AlertType;
	variant: AlertVariant;
} & PropLabel &
	PropAlert &
	PropHasCloser;

type RequiredAlertStates = RequiredAlertProps;
type OptionalAlertStates = Omit<OptionalAlertProps, 'heading'>;

export type Props = Generic.Element.Members<RequiredAlertProps, OptionalAlertProps>;
export type States = Generic.Element.Members<RequiredAlertStates, OptionalAlertStates>;
export type API = Generic.Element.ComponentApi<RequiredAlertProps, Omit<OptionalAlertProps, 'heading'>, RequiredAlertStates, OptionalAlertStates>; // deprecated prop omitted

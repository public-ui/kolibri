import { Generic } from '@a11y-ui/core';

import { EventCallback } from '../../types/callbacks';
import { HeadingLevel } from '../../types/heading-level';
import { PropLabel } from '../../types/props/label';

export type AlertType = 'default' | 'info' | 'success' | 'warning' | 'error';
export type AlertVariant = 'card' | 'msg';

export type KoliBriAlertEventCallbacks = {
	onClose?: EventCallback<Event>;
};

type RequiredAlertProps = unknown;
type OptionalAlertProps = {
	alert: boolean;
	hasCloser: boolean;
	/**
	 * @deprecated Use label.
	 */
	heading: string;
	level: HeadingLevel;
	on: KoliBriAlertEventCallbacks;
	type: AlertType;
	variant: AlertVariant;
} & PropLabel;

type RequiredAlertStates = RequiredAlertProps;
type OptionalAlertStates = Omit<OptionalAlertProps, 'heading'>;

export type Props = Generic.Element.Members<RequiredAlertProps, OptionalAlertProps>;
export type States = Generic.Element.Members<RequiredAlertStates, OptionalAlertStates>;
export type API = Generic.Element.ComponentApi<RequiredAlertProps, Omit<OptionalAlertProps, 'heading'>, RequiredAlertStates, OptionalAlertStates>; // deprecated prop omitted

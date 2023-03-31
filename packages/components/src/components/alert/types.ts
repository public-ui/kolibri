import { Generic } from '@a11y-ui/core';

import { EventCallback } from '../../types/callbacks';
import { HeadingLevel } from '../../types/heading-level';

export type AlertType = 'default' | 'info' | 'success' | 'warning' | 'error';
export type AlertVariant = 'card' | 'msg';

export type KoliBriAlertEventCallbacks = {
	onClose?: EventCallback<Event>;
};

type RequiredAlertProps = unknown;
type OptionalAlertProps = {
	alert: boolean;
	hasCloser: boolean;
	heading: string;
	level: HeadingLevel;
	on: KoliBriAlertEventCallbacks;
	type: AlertType;
	variant: AlertVariant;
};

type RequiredAlertStates = RequiredAlertProps;
type OptionalAlertStates = OptionalAlertProps;

export type Props = Generic.Element.Members<RequiredAlertProps, OptionalAlertProps>;
export type States = Generic.Element.Members<RequiredAlertStates, OptionalAlertStates>;
export type API = Generic.Element.ComponentApi<RequiredAlertProps, OptionalAlertProps, RequiredAlertStates, OptionalAlertStates>;

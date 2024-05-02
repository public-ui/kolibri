import type { Generic } from 'adopted-style-sheets';

import type { HeadingLevel, PropAlert, PropHasCloser, PropLabel } from '../props';
import type { EventCallback } from '../types';

export const alertTypeOptions = ['default', 'info', 'success', 'warning', 'error'] as const;
export type AlertType = (typeof alertTypeOptions)[number];

export const alertVariantOptions = ['card', 'msg'] as const;
export type AlertVariant = (typeof alertVariantOptions)[number];

export type KoliBriAlertEventCallbacks = {
	onClose?: EventCallback<Event>;
};

type RequiredAlertProps = NonNullable<unknown>;
type OptionalAlertProps = {
	level: HeadingLevel;
	on: KoliBriAlertEventCallbacks;
	type: AlertType;
	variant: AlertVariant;
} & PropLabel &
	PropAlert &
	PropHasCloser;

type RequiredAlertStates = RequiredAlertProps;
type OptionalAlertStates = OptionalAlertProps;

export type AlertProps = Generic.Element.Members<RequiredAlertProps, OptionalAlertProps>;
export type AlertStates = Generic.Element.Members<RequiredAlertStates, OptionalAlertStates>;
export type AlertAPI = Generic.Element.ComponentApi<RequiredAlertProps, OptionalAlertProps, RequiredAlertStates, OptionalAlertStates>;

import type { Generic } from 'adopted-style-sheets';

import type { HeadingLevel, PropAlert, PropAlertType, PropAlertVariant, PropHasCloser, PropLabelLangSegments } from '../props';
import type { EventCallback } from '../types';

export type KoliBriAlertEventCallbacks = {
	onClose?: EventCallback<Event>;
};

type RequiredAlertProps = NonNullable<unknown>;
type OptionalAlertProps = {
	level: HeadingLevel;
	on: KoliBriAlertEventCallbacks;
} & PropLabelLangSegments &
	PropAlert &
	PropHasCloser &
	PropAlertType &
	PropAlertVariant;

type RequiredAlertStates = RequiredAlertProps;
type OptionalAlertStates = OptionalAlertProps;

export type InternalAlertProps = RequiredAlertProps & OptionalAlertProps;

export type AlertProps = Generic.Element.Members<RequiredAlertProps, OptionalAlertProps>;
export type AlertStates = Generic.Element.Members<RequiredAlertStates, OptionalAlertStates>;
export type AlertAPI = Generic.Element.ComponentApi<RequiredAlertProps, OptionalAlertProps, RequiredAlertStates, OptionalAlertStates>;

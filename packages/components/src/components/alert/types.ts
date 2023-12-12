import { Generic } from 'adopted-style-sheets';

import { EventCallback } from '../../types/callbacks';
import { HeadingLevel } from '../../types/heading-level';
import { PropAlert } from '../../types/props/alert';
import { PropHasCloser } from '../../types/props/has-closer';
import { PropLabel } from '../../types/props/label';

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

export type Props = Generic.Element.Members<RequiredAlertProps, OptionalAlertProps>;
export type States = Generic.Element.Members<RequiredAlertStates, OptionalAlertStates>;
export type API = Generic.Element.ComponentApi<RequiredAlertProps, OptionalAlertProps, RequiredAlertStates, OptionalAlertStates>;

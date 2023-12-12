import { Generic } from 'adopted-style-sheets';

import { LabelPropType } from '../../types/props/label';
import { AlertType, AlertVariant } from '../alert/types';

const toastStatusOptions = ['adding', 'settled', 'removing'] as const;
type ToastStatus = (typeof toastStatusOptions)[number];

export type Toast = {
	description?: string;
	render?: (nodeRef: HTMLElement, options: { close: () => void }) => void;
	label: LabelPropType;
	type: AlertType;
	alertVariant?: AlertVariant;
};

export type ToastState = {
	toast: Toast;
	status: ToastStatus;
	id: string;
};

export type ToasterOptions = {
	defaultAlertVariant: AlertVariant;
};

type RequiredProps = NonNullable<unknown>;
type OptionalProps = NonNullable<unknown>;

type RequiredStates = RequiredProps & {
	toastStates: ToastState[];
};
type OptionalStates = OptionalProps;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

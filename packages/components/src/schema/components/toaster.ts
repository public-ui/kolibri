import type { Generic } from 'adopted-style-sheets';

import type { LabelPropType } from '../props';
import type { AlertType, AlertVariant } from './alert';

const toastStatusOptions = ['adding', 'settled', 'removing'] as const;
type ToastStatus = (typeof toastStatusOptions)[number];

export type ToastRenderFunction = (nodeRef: HTMLElement, options: { close: () => void }) => void;

export type Toast = {
	description?: string;
	render?: ToastRenderFunction;
	label: LabelPropType;
	type: AlertType;
	/**
	 * @deprecated Use variant instead
	 */
	alertVariant?: AlertVariant;
	variant?: AlertVariant;
};

export type ToastState = {
	toast: Toast;
	status: ToastStatus;
	id: string;
};

export type ToasterOptions = {
	/**
	 * @deprecated Use defaultVariant instead
	 */
	defaultAlertVariant: AlertVariant;
	defaultVariant: AlertVariant;
};

type RequiredProps = NonNullable<unknown>;
type OptionalProps = NonNullable<unknown>;

type RequiredStates = RequiredProps & {
	toastStates: ToastState[];
};
type OptionalStates = OptionalProps;

export type ToasterProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type ToasterStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type ToasterAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

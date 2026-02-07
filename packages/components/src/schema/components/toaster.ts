import type { Generic } from 'adopted-style-sheets';

import type { AlertTypePropType, LabelPropType } from '../props';

type ToastStatus = 'adding' | 'removing' | 'settled';

export type ToastRenderFunction = (nodeRef: HTMLElement, options: { close: () => void }) => void;

export type Toast = {
	description?: string;
	render?: ToastRenderFunction;
	label: LabelPropType;
	type: AlertTypePropType;
	/**
	 * @deprecated Use `ToasterOptions.defaultVariant` when initializing the service instead.
	 */
	variant?: 'card';
	onClose?: () => void;
};

export type ToastState = {
	toast: Toast;
	status: ToastStatus;
	id: string;
};

export type ToasterOptions = {
	/**
	 * @deprecated Use `ToasterOptions.defaultVariant` when initializing the service instead.
	 */
	defaultVariant: 'card';
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

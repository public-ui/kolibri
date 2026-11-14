import type { Generic } from 'adopted-style-sheets';

import type { AlertTypePropType, LabelPropType } from '../props';

type ToastStatus = 'adding' | 'removing' | 'settled';

/**
 * @deprecated Will be removed in the next major version. Use `kol-alert` for inline notifications or `kol-dialog` for interactive messages instead. See https://github.com/public-ui/kolibri/issues/8372
 */
export type ToastRenderFunction = (nodeRef: HTMLElement, options: { close: () => void }) => void;

/**
 * @deprecated Will be removed in the next major version. Use `kol-alert` for inline notifications or `kol-dialog` for interactive messages instead. See https://github.com/public-ui/kolibri/issues/8372
 */
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

/**
 * @deprecated Will be removed in the next major version. See https://github.com/public-ui/kolibri/issues/8372
 */
export type ToastState = {
	toast: Toast;
	status: ToastStatus;
	id: string;
};

/**
 * @deprecated Will be removed in the next major version. Use `kol-alert` for inline notifications or `kol-dialog` for interactive messages instead. See https://github.com/public-ui/kolibri/issues/8372
 */
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

/** @deprecated Will be removed in the next major version. See https://github.com/public-ui/kolibri/issues/8372 */
export type ToasterProps = Generic.Element.Members<RequiredProps, OptionalProps>;
/** @deprecated Will be removed in the next major version. See https://github.com/public-ui/kolibri/issues/8372 */
export type ToasterStates = Generic.Element.Members<RequiredStates, OptionalStates>;
/** @deprecated Will be removed in the next major version. See https://github.com/public-ui/kolibri/issues/8372 */
export type ToasterAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

import { Generic } from '@a11y-ui/core';

import { LabelPropType } from '../../types/props/label';
import { AlertType } from '../alert/types';

export const toastStatusOptions = ['adding', 'settled', 'removing'] as const;
export type ToastStatus = (typeof toastStatusOptions)[number];

export type Toast = {
	description: string;
	label: LabelPropType;
	type: AlertType;
};

export type ToastState = {
	toast: Toast;
	status: ToastStatus;
	id: string;
};

type RequiredProps = NonNullable<unknown>;
type OptionalProps = NonNullable<unknown>;

type RequiredStates = RequiredProps & {
	toastStates: ToastState[];
};
type OptionalStates = OptionalProps;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

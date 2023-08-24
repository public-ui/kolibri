import { Generic } from '@a11y-ui/core';
import { Toast } from '../toast/toaster';

export type ToastState = {
	toast: Toast;
	status: 'adding' | 'settled' | 'removing';
};

type RequiredProps = NonNullable<unknown>;
type OptionalProps = NonNullable<unknown>;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps & {
	toastStates: ToastState[];
};
type OptionalStates = OptionalProps;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

import { Generic } from '@a11y-ui/core';

import { PropLabel } from '../../types/props/label';
import { KoliBriToastEventCallbacks } from '../../types/toast';
import { AlertType } from '../alert/types';
import { ToastStatus } from '../toast-container/types';

type RequiredProps = PropLabel & {
	status: ToastStatus;
};
type OptionalProps = {
	on: KoliBriToastEventCallbacks;
	type: AlertType;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

import type { Generic } from 'adopted-style-sheets';

import type { Callback } from '../enums';
import type { PropErrorList } from '../props';
import type { EventCallback } from '../types';

export type KoliBriFormCallbacks = {
	[Callback.onSubmit]?: EventCallback<Event>;
	[Callback.onReset]?: EventCallback<Event>;
};

type RequiredProps = NonNullable<unknown>;
type OptionalProps = {
	on: KoliBriFormCallbacks;
	requiredText: string | boolean;
} & PropErrorList;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;

export type FormProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type FormStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type FormAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

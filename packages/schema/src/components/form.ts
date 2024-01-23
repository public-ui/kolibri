import type { Generic } from 'adopted-style-sheets';

import type { Events } from '../enums';
import type { PropErrorList } from '../props';
import type { EventCallback } from '../types';

export type KoliBriFormCallbacks = {
	[Events.onSubmit]?: EventCallback<Event>;
	[Events.onReset]?: EventCallback<Event>;
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

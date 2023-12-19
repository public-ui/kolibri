import type { Generic } from 'adopted-style-sheets';

import { Events } from '../../enums/events';
import { EventCallback } from '../../types/callbacks';

export type KoliBriFormCallbacks = {
	[Events.onSubmit]?: EventCallback<Event>;
	[Events.onReset]?: EventCallback<Event>;
};

type ErrorListType = {
	message: string;
	selector: string;
};

type RequiredProps = NonNullable<unknown>;
type OptionalProps = {
	errors: ErrorListType[];
	on: KoliBriFormCallbacks;
	requiredText: string | boolean;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

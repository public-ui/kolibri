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

export type FormProps = Generic.Element.Members<RequiredProps, OptionalProps>;

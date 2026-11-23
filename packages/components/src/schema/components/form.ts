import type { Callback } from '../enums';
import type { EventCallback } from '../types';

export type KoliBriFormCallbacks = {
	[Callback.onSubmit]?: EventCallback<Event>;
	[Callback.onReset]?: EventCallback<Event>;
};

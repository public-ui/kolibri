import type { EventCallback } from '../types';

export type KoliBriCardEventCallbacks = {
	onClose?: EventCallback<Event>;
	onFocus?: EventCallback<FocusEvent>;
	onBlur?: EventCallback<FocusEvent>;
};

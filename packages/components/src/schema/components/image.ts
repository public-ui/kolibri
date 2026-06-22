import type { EventCallback } from '../types';

export type KoliBriImageEventCallbacks = {
	onError?: EventCallback<Event>;
	onLoad?: EventCallback<Event>;
};

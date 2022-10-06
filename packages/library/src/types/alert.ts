import { EventCallback } from './callbacks';

export type AlertType = 'default' | 'info' | 'success' | 'warning' | 'error';
export type AlertVariant = 'card' | 'msg';

export type KoliBriAlertEventCallbacks = {
	onClose?: EventCallback<Event>;
};

import type { KoliBriAlertEventCallbacks } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

export type AlertCallbacksProp = SimpleProp<'on', KoliBriAlertEventCallbacks>;

/**
 * A value that is no object carries no callbacks: it clears them without a warning, so an invalid
 * `_on` calls nothing, exactly like reading the raw prop.
 */
function normalizeAlertCallbacks(value: unknown): KoliBriAlertEventCallbacks {
	return typeof value === 'object' && value !== null ? (value as KoliBriAlertEventCallbacks) : {};
}

export const alertCallbacksProp = createPropDefinition<AlertCallbacksProp>('on', {}, normalizeAlertCallbacks);

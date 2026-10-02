import type { KoliBriImageEventCallbacks } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

export type ImageCallbacksProp = SimpleProp<'on', KoliBriImageEventCallbacks>;

/**
 * A value that is no object carries no callbacks: it clears them without a warning, so an invalid
 * `_on` calls nothing, exactly like reading the raw prop.
 */
function normalizeImageCallbacks(value: unknown): KoliBriImageEventCallbacks {
	return typeof value === 'object' && value !== null ? (value as KoliBriImageEventCallbacks) : {};
}

export const imageCallbacksProp = createPropDefinition<ImageCallbacksProp>('on', {}, normalizeImageCallbacks);

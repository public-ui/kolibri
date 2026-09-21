import type { KoliBriCardEventCallbacks } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

export type CardCallbacksProp = SimpleProp<'on', KoliBriCardEventCallbacks>;

/**
 * Normalizes the callbacks object. The factory's `apply` resolves undefined/null to the default
 * `{}` before this is reached, so only a non-null value has to be verified as an object.
 */
function normalizeCardCallbacks(value: unknown): KoliBriCardEventCallbacks {
	if (typeof value === 'object' && value !== null) {
		return value as KoliBriCardEventCallbacks;
	}
	throw new Error(`Invalid on callbacks: expected object, got ${typeof value}`);
}

export const cardCallbacksProp = createPropDefinition<CardCallbacksProp>('on', {}, normalizeCardCallbacks);

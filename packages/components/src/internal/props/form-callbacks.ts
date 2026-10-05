import type { KoliBriFormCallbacks } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

export type FormCallbacksProp = SimpleProp<'on', KoliBriFormCallbacks>;

/**
 * Normalizes the callbacks object. The factory's `apply` handles undefined/null (falling back to
 * the default `{}`) before this is reached, so only a non-null object has to be verified — which
 * mirrors the predecessor's `typeof value === 'object' && value !== null` guard.
 */
function normalizeFormCallbacks(value: unknown): KoliBriFormCallbacks {
	if (typeof value === 'object' && value !== null) {
		return value as KoliBriFormCallbacks;
	}
	throw new Error(`Invalid on callbacks: expected object, got ${typeof value}`);
}

export const formCallbacksProp = createPropDefinition<FormCallbacksProp>('on', {}, normalizeFormCallbacks);

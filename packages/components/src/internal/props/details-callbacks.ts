import type { DetailsCallbacksPropType } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

export type DetailsCallbacksProp = SimpleProp<'on', DetailsCallbacksPropType<boolean>>;

/**
 * Normalizes the callbacks object. The factory's `apply` handles undefined/null (falling back to
 * the default `{}`) before this is reached, so we only need to verify a non-null value is an object.
 */
function normalizeDetailsCallbacks(value: unknown): DetailsCallbacksPropType<boolean> {
	if (typeof value === 'object' && value !== null) {
		return value as DetailsCallbacksPropType<boolean>;
	}
	throw new Error(`Invalid on callbacks: expected object, got ${typeof value}`);
}

export const detailsCallbacksProp = createPropDefinition<DetailsCallbacksProp>('on', {}, normalizeDetailsCallbacks);

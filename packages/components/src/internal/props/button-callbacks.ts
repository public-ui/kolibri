import type { ButtonCallbacksPropType, StencilUnknown } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

export type ButtonCallbacksProp = SimpleProp<'on', ButtonCallbacksPropType<StencilUnknown>>;

/**
 * Normalizes the callbacks object. The factory's `apply` handles undefined/null (falling back to
 * the default `{}`) before this is reached, so we only need to verify a non-null value is an object.
 */
function normalizeButtonCallbacks(value: unknown): ButtonCallbacksPropType<StencilUnknown> {
	if (typeof value === 'object' && value !== null) {
		return value as ButtonCallbacksPropType<StencilUnknown>;
	}
	throw new Error(`Invalid on callbacks: expected object, got ${typeof value}`);
}

export const buttonCallbacksProp = createPropDefinition<ButtonCallbacksProp>('on', {}, normalizeButtonCallbacks);

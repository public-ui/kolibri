import type { LinkOnCallbacksPropType } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

export type LinkCallbacksProp = SimpleProp<'on', LinkOnCallbacksPropType>;

/**
 * Normalizes the callbacks object. The factory's `apply` handles undefined/null (falling back to
 * the default `{}`) before this is reached, so we only need to verify a non-null value is an object.
 */
function normalizeLinkCallbacks(value: unknown): LinkOnCallbacksPropType {
	if (typeof value === 'object' && value !== null) {
		return value as LinkOnCallbacksPropType;
	}
	throw new Error(`Invalid on callbacks: expected object, got ${typeof value}`);
}

export const linkCallbacksProp = createPropDefinition<LinkCallbacksProp>('on', {}, normalizeLinkCallbacks);

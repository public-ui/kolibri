import type { LinkOnCallbacksPropType } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

/**
 * Link On Callbacks prop
 *
 * Defines the callback functions for link interactions.
 * Accepts an object containing an optional onClick handler.
 */
export type LinkOnProp = SimpleProp<'on', LinkOnCallbacksPropType>;

export const linkOnProp = createPropDefinition<LinkOnProp>('on', {} as LinkOnCallbacksPropType, (value: unknown): LinkOnCallbacksPropType => {
	if (typeof value === 'object' && value !== null) {
		return value as LinkOnCallbacksPropType;
	}
	throw new Error(`Invalid link callbacks: expected object, got ${typeof value}`);
});

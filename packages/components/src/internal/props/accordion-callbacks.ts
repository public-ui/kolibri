import type { AccordionCallbacksPropType } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

export type AccordionCallbacksProp = SimpleProp<'on', AccordionCallbacksPropType<boolean>>;

/**
 * Normalizes the callbacks object. The factory's `apply` handles undefined/null (falling back to
 * the default `{}`) before this is reached, so we only need to verify a non-null value is an object.
 */
function normalizeAccordionCallbacks(value: unknown): AccordionCallbacksPropType<boolean> {
	if (typeof value === 'object' && value !== null) {
		return value as AccordionCallbacksPropType<boolean>;
	}
	throw new Error(`Invalid on callbacks: expected object, got ${typeof value}`);
}

export const accordionCallbacksProp = createPropDefinition<AccordionCallbacksProp>('on', {}, normalizeAccordionCallbacks);

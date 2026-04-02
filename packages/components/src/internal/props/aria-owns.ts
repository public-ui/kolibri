import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Aria Owns prop
 *
 * Defines the contextual relationship between a parent and its child elements.
 * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-owns
 */
export type AriaOwnsProp = SimpleProp<'ariaOwns', string>;

export const ariaOwnsProp = createPropDefinition<AriaOwnsProp>('ariaOwns', '', normalizeString);

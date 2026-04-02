import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Aria Description prop
 *
 * Defines the aria-description attribute for accessible descriptions.
 * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-description
 */
export type AriaDescriptionProp = SimpleProp<'ariaDescription', string>;

export const ariaDescriptionProp = createPropDefinition<AriaDescriptionProp>('ariaDescription', '', normalizeString);

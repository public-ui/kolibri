import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Aria Controls prop
 *
 * Defines which elements are controlled by this component.
 * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls
 */
export type AriaControlsProp = SimpleProp<'ariaControls', string>;

export const ariaControlsProp = createPropDefinition<AriaControlsProp>('ariaControls', '', normalizeString);

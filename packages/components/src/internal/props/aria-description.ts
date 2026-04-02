import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * ARIA Description prop for extended descriptions
 *
 * Description:
 * Defines the value for the aria-description attribute, which provides
 * a more detailed description of the element's purpose or function.
 *
 * Usage (according to WAI-ARIA):
 * - Provides additional context beyond the accessible name
 * - Screen readers typically announce this after the accessible name
 * - Use for supplementary information that wouldn't fit in a label
 *
 * @see https://www.w3.org/TR/wai-aria-1.2/#aria-description
 */
export type AriaDescriptionProp = SimpleProp<'ariaDescription', string>;
export const ariaDescriptionProp = createPropDefinition<AriaDescriptionProp>('ariaDescription', '', normalizeString);

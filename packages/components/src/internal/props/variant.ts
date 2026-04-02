import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Variant prop
 *
 * Defines a variant class name for styling customization.
 * Can be any string used as a CSS class modifier.
 */
export type VariantProp = SimpleProp<'variant', string>;

export const variantProp = createPropDefinition<VariantProp>('variant', '', normalizeString);

import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Custom Class prop
 *
 * Defines the custom class attribute (used with variant="custom").
 */
export type CustomClassProp = SimpleProp<'customClass', string>;

export const customClassProp = createPropDefinition<CustomClassProp>('customClass', '', normalizeString);

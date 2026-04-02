import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Custom Class prop for variant styling
 *
 * Description:
 * Defines the custom class attribute to apply when using custom variants.
 * This allows theming and style customization beyond predefined variants.
 *
 * Usage:
 * - Typically used in conjunction with _variant="custom"
 * - Allows application-specific styling
 * - Should follow BEM or component naming conventions
 */
export type CustomClassProp = SimpleProp<'customClass', string>;
export const customClassProp = createPropDefinition<CustomClassProp>('customClass', '', normalizeString);

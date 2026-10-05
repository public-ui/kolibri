import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';
import { isSafeClassName } from './helpers/validators';

export type CustomClassProp = SimpleProp<'customClass', string>;

/**
 * Validates the normalized custom-class value. An empty string is valid (means no custom class);
 * any non-empty value must be a single safe class name.
 */
function validateCustomClass(value: string): boolean {
	return value === '' || isSafeClassName(value);
}

export const customClassProp = createPropDefinition<CustomClassProp>('customClass', '', normalizeString, validateCustomClass);

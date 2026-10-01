import type { InputCheckboxVariantPropType } from '../../schema';
import { inputCheckboxVariantOptions } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Variant prop of `kol-input-checkbox`
 *
 * Description:
 * Presents the checkbox as box (`default`), as switch (`switch`) or as toggle button (`button`).
 */
export type VariantInputCheckboxProp = SimpleProp<'variant', InputCheckboxVariantPropType>;
export const variantInputCheckboxProp = createPropDefinition<VariantInputCheckboxProp>('variant', 'default', (value: unknown) => {
	const str = normalizeString(value);
	if (inputCheckboxVariantOptions.includes(str as InputCheckboxVariantPropType)) {
		return str as InputCheckboxVariantPropType;
	}
	throw new Error(`Invalid checkbox variant: ${str}`);
});

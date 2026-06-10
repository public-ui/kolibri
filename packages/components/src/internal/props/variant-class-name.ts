import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Variant Class Name prop for free-form presentation variants
 *
 * Description:
 * Defines which variant should be used for presentation without restricting the
 * value to a predefined set (unlike the button variant prop). The value is used
 * as a BEM modifier suffix (e.g. `kol-button--<variant>`), so custom themes can
 * provide their own variants.
 *
 * Default: 'normal'
 */
export type VariantClassNameProp = SimpleProp<'variant', string>;

export const variantClassNameProp = createPropDefinition<VariantClassNameProp>('variant', 'normal', (value) => {
	const str = normalizeString(value);
	if (str.length === 0) {
		return 'normal';
	}
	return str;
});

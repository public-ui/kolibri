import type { SpinVariantPropType } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type VariantSpinProp = SimpleProp<'variant', SpinVariantPropType>;
export const variantSpinProp = createPropDefinition<VariantSpinProp>(
	normalizeString as (value: unknown) => SpinVariantPropType,
	(v) => ['cycle', 'dot', 'none'].includes(v),
);

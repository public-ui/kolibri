import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export const progressVariantOptions = ['bar', 'cycle'] as const;
export type ProgressVariantType = (typeof progressVariantOptions)[number];

export type VariantProgressProp = SimpleProp<'variant', ProgressVariantType>;
export const variantProgressProp = createPropDefinition<VariantProgressProp>(
	(value: unknown) => {
		const str = normalizeString(value);
		if (progressVariantOptions.includes(str as ProgressVariantType)) {
			return str as ProgressVariantType;
		}
		throw new Error(`Invalid progress variant: ${str}`);
	},
	() => true,
	'bar',
);

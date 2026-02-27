import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type QuoteVariantType = 'block' | 'inline';
export type VariantQuoteProp = Prop<'variant', string, QuoteVariantType>;

const QUOTE_VARIANT_OPTIONS: ReadonlySet<string> = new Set<QuoteVariantType>(['block', 'inline']);

export const variantQuoteProp = createPropDefinition<VariantQuoteProp>(
	(value: unknown) => {
		const str = normalizeString(value);
		if (QUOTE_VARIANT_OPTIONS.has(str)) {
			return str as QuoteVariantType;
		}
		throw new Error(`Invalid quote variant: ${str}`);
	},
	() => true,
);

import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type QuoteVariantType = 'block' | 'inline';
export type VariantQuoteProp = SimpleProp<'variant', QuoteVariantType>;

const QUOTE_VARIANT_OPTIONS: ReadonlySet<string> = new Set<QuoteVariantType>(['block', 'inline']);

export const variantQuoteProp = createPropDefinition<VariantQuoteProp>(
	(value: unknown) => normalizeString(value) as QuoteVariantType,
	(v) => QUOTE_VARIANT_OPTIONS.has(v),
);

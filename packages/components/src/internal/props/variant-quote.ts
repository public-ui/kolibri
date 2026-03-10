import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

const QUOTE_VARIANT_OPTIONS = ['block', 'inline'] as const;
export type QuoteVariantType = (typeof QUOTE_VARIANT_OPTIONS)[number];
export type VariantQuoteProp = SimpleProp<'variant', QuoteVariantType>;

const QUOTE_VARIANT_SET: ReadonlySet<string> = new Set(QUOTE_VARIANT_OPTIONS);

export const variantQuoteProp = createPropDefinition<VariantQuoteProp>(
	(value: unknown) => normalizeString(value) as QuoteVariantType,
	(v) => QUOTE_VARIANT_SET.has(v),
	'inline',
);

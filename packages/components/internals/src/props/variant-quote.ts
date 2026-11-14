import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Variant prop for quotation display style
 *
 * Description:
 * Determines whether the quotation is rendered as a block-level (<blockquote>) or
 * inline (<q>) element. The choice affects both visual layout and semantic HTML structure.
 *
 * Usage (according to W3C HTML specification):
 * - "block": Renders as <blockquote> — for extended, standalone quotations from an external source
 * - "inline": Renders as <q> — for short inline quotations within flowing text (default)
 * - The browser automatically adds appropriate quotation marks around <q> elements
 * - Both elements support the cite attribute to reference the quotation source
 *
 * Accessibility:
 * - Semantic HTML elements (<blockquote>, <q>) help assistive technologies convey content structure
 * - The quotation structure must be programmatically determinable (WCAG 1.3.1 Info and Relationships)
 * - Block quotes are announced as distinct sections by screen readers
 *
 * @see https://html.spec.whatwg.org/multipage/grouping-content.html#the-blockquote-element
 * @see https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-q-element
 * @see https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html
 */
const QUOTE_VARIANT_OPTIONS = ['block', 'inline'] as const;
export type QuoteVariantType = (typeof QUOTE_VARIANT_OPTIONS)[number];
export type VariantQuoteProp = SimpleProp<'variant', QuoteVariantType>;

const QUOTE_VARIANT_SET: ReadonlySet<string> = new Set(QUOTE_VARIANT_OPTIONS);

export const variantQuoteProp = createPropDefinition<VariantQuoteProp>(
	'variant',
	'inline',
	(value: unknown) => normalizeString(value) as QuoteVariantType,
	(v) => QUOTE_VARIANT_SET.has(v),
);

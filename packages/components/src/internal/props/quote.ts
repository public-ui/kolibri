import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Quote prop for cited text content
 *
 * Description:
 * Contains the quoted text to be rendered. The content is displayed within semantically
 * correct HTML quotation elements (<blockquote> or <q>) depending on the variant.
 *
 * Usage (according to W3C HTML specification):
 * - The quote text should be attributed to its source using the cite attribute or a visible citation
 * - Block quotes (<blockquote>) are for extended quotations from an external source
 * - Inline quotes (<q>) are for short inline quotations
 * - Quotation marks are automatically added by the browser for <q> elements
 *
 * Accessibility:
 * - Semantic quotation elements help assistive technologies convey the nature of the content
 * - The structure must be programmatically determinable (WCAG 1.3.1 Info and Relationships)
 *
 * @see https://html.spec.whatwg.org/multipage/grouping-content.html#the-blockquote-element
 * @see https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-q-element
 * @see https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html
 */
export type QuoteProp = SimpleProp<'quote', string>;
export const quoteProp = createPropDefinition<QuoteProp>('quote', '', normalizeString);

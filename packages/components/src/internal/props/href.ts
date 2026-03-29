import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Href prop for links and navigation
 *
 * Description:
 * The href attribute defines the URL target for a link. Using a sentinel value like '#no-href-set'
 * as a default can break expected link behavior and prevent consumers from clearing the href to an empty string.
 *
 * Usage:
 * - Valid URL: href="https://example.com"
 * - Relative path: href="/page"
 * - Fragment: href="#section"
 * - Empty/undefined: href="" (no link target, should prevent navigation)
 *
 * Consumers should check if href is non-empty before rendering clickable links.
 * An empty href means the component should not resolve to a link.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
 */
export type HrefProp = SimpleProp<'href', string>;
export const hrefProp = createPropDefinition<HrefProp>('href', '', normalizeString, (v) => typeof v === 'string');

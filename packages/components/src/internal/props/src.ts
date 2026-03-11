import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Src prop for embedded content (images, videos, iframes)
 *
 * Description:
 * The src attribute specifies the URL of the resource to embed. It is the primary source
 * for media elements such as <img>, <video>, <audio>, and <iframe>.
 *
 * Usage (according to W3C HTML specification):
 * - Absolute URL: src="https://example.com/image.png"
 * - Relative URL: src="/images/photo.jpg"
 * - Must be a valid, non-empty URL when the element is intended to display content
 * - For images, always pair with a meaningful alt attribute (WCAG 1.1.1)
 *
 * Accessibility:
 * - Ensure media referenced by src has appropriate text alternatives (WCAG 1.1.1 Non-text Content)
 * - Avoid auto-playing media without user control (WCAG 1.4.2 Audio Control)
 *
 * @see https://html.spec.whatwg.org/multipage/embedded-content.html#attr-img-src
 * @see https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html
 */
export type SrcProp = SimpleProp<'src', string>;
export const srcProp = createPropDefinition<SrcProp>('src', '', normalizeString);

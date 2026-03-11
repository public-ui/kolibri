import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Srcset prop for responsive images
 *
 * Description:
 * The srcset attribute defines a set of image sources with descriptors, allowing the browser
 * to select the most appropriate image based on screen size, resolution, or viewport width.
 * Used together with the sizes attribute for art direction and performance optimization.
 *
 * Usage (according to W3C HTML specification):
 * - Width descriptor: srcset="small.jpg 480w, large.jpg 1024w"
 * - Pixel density descriptor: srcset="image-1x.jpg 1x, image-2x.jpg 2x"
 * - Must be used with a src fallback for browsers that do not support srcset
 *
 * Accessibility:
 * - The selected image must still meet all accessibility requirements (alt text, contrast)
 * - Responsive images help users with low bandwidth or small screens (WCAG 1.4.4 Resize Text)
 *
 * @see https://html.spec.whatwg.org/multipage/embedded-content.html#attr-img-srcset
 * @see https://www.w3.org/WAI/WCAG21/Understanding/resize-text.html
 */
export type SrcsetProp = SimpleProp<'srcset', string>;
export const srcsetProp = createPropDefinition<SrcsetProp>('srcset', '', normalizeString);

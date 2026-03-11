import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Sizes prop for responsive image source selection
 *
 * Description:
 * The sizes attribute defines a set of media conditions and corresponding image display sizes.
 * It works together with srcset to help the browser select the optimal image source for the
 * current viewport and layout.
 *
 * Usage (according to W3C HTML specification):
 * - Media condition with size: sizes="(max-width: 600px) 100vw, 50vw"
 * - Single size: sizes="100vw"
 * - Must be paired with a srcset attribute using width descriptors (e.g., "image.jpg 800w")
 * - If omitted, defaults to "100vw" (whole viewport width)
 *
 * Accessibility:
 * - Responsive images support users who zoom or use small screens (WCAG 1.4.4 Resize Text)
 * - The correct image size preserves readability and avoids content overflow (WCAG 1.4.10 Reflow)
 *
 * @see https://html.spec.whatwg.org/multipage/embedded-content.html#attr-img-sizes
 * @see https://www.w3.org/WAI/WCAG21/Understanding/resize-text.html
 * @see https://www.w3.org/WAI/WCAG21/Understanding/reflow.html
 */
export type SizesProp = SimpleProp<'sizes', string>;
export const sizesProp = createPropDefinition<SizesProp>('sizes', '', normalizeString);

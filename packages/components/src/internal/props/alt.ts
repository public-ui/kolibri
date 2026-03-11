import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Alt text prop for images
 *
 * Description:
 * Alt text is essential for image accessibility. It is read by screen readers and improves the user experience
 * for people with visual impairments.
 *
 * Usage (according to WCAG 2.1):
 * - Descriptive text: alt="A person sitting at a desk"
 * - Decorative image: alt="" (empty string) - signals to screen readers that the image is decorative
 * - Avoid: alt="image", alt="no alt text" (too vague)
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html
 */
export type AltProp = SimpleProp<'alt', string>;
export const altProp = createPropDefinition<AltProp>(
	'alt',
	'', // Default: empty string allows decorative images
	normalizeString,
	(v) => typeof v === 'string', // Accepts all strings (including '')
);

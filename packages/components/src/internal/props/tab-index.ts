import { a11yHint } from '../../schema/utils/a11y.tipps';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeInteger } from './helpers/normalizers';

/**
 * TabIndex prop for controlling tab order
 *
 * Description:
 * Specifies the tab order of interactive elements when using the keyboard.
 *
 * Usage (according to WCAG 2.1 and WAI-ARIA):
 * - Default: 0 (element follows the natural DOM order)
 * - Positive values (1, 2, 3, etc.): element is moved to the front of the tab order
 * - Negative values (typically -1): element is not reachable via sequential navigation
 *
 * Accessibility concerns:
 * - Positive tabIndex values can disrupt the natural tab order and confuse users
 * - Recommended to rely on DOM order (tabIndex={0}) or use -1 for non-tabbable elements
 * - Screen reader users expect a logical tab order matching the visual order
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
 */
export type TabIndexProp = SimpleProp<'tabIndex', number>;
export const tabIndexProp = createPropDefinition<TabIndexProp>('tabIndex', 0, normalizeInteger, undefined, {
	hints: (_propName, value) => {
		if (typeof value === 'number' && value > 0) {
			a11yHint(`Positive tabIndex values ("${value}") can disrupt the natural tab order. Use 0 for tabbable elements or rely on DOM order.`);
		}
	},
});

import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * ARIA Controls prop for identifying controlled elements
 *
 * Description:
 * Defines which elements are controlled by this component.
 * The value should be one or more space-separated IDs of elements that are controlled.
 *
 * Usage (according to WAI-ARIA):
 * - Identifies the element(s) whose contents or presence are controlled by the current element
 * - Commonly used with buttons that show/hide or expand/collapse content
 * - Should reference existing element IDs in the document
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls
 * @see https://www.w3.org/TR/wai-aria-1.2/#aria-controls
 */
export type AriaControlsProp = SimpleProp<'ariaControls', string>;
export const ariaControlsProp = createPropDefinition<AriaControlsProp>('ariaControls', '', normalizeString);

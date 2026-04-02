import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

/**
 * ARIA Expanded prop for expansion state
 *
 * Description:
 * Defines whether the interactive element of the component expanded something.
 * Used with elements that control the visibility of other content.
 *
 * Usage (according to WAI-ARIA):
 * - true: The controlled element is expanded/visible
 * - false: The controlled element is collapsed/hidden
 * - undefined: The element does not control expandable content
 * - Commonly used with accordion buttons, menu buttons, disclosure widgets
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded
 * @see https://www.w3.org/TR/wai-aria-1.2/#aria-expanded
 */
export type AriaExpandedProp = SimpleProp<'ariaExpanded', boolean>;
export const ariaExpandedProp = createPropDefinition<AriaExpandedProp>('ariaExpanded', false, normalizeBoolean);

import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeInteger } from './helpers/normalizers';

/**
 * Tab Index prop for controlling keyboard navigation order
 *
 * Description:
 * Defines which tab-index the primary element of the component has.
 * Controls the sequential keyboard navigation order.
 *
 * Usage (according to WCAG 2.1 and HTML specification):
 * - Negative value (typically -1): Element is focusable programmatically but not via keyboard
 * - 0: Element follows natural tab order
 * - Positive values: Explicit tab order (discouraged, creates confusion)
 *
 * Best practices:
 * - Avoid positive tabindex values
 * - Use natural DOM order when possible
 * - Use -1 for programmatic focus only
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
 * @see https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html
 */
/**
 * Internally the empty string represents "not set", so no tabindex attribute
 * is rendered unless the prop is explicitly provided.
 */
export type TabIndexProp = Prop<'tabIndex', number, number | ''>;
export const tabIndexProp = createPropDefinition<TabIndexProp>('tabIndex', '', normalizeInteger);

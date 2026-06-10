import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

/**
 * ARIA Selected prop for selection state
 *
 * Description:
 * Defines whether the interactive element of the component is selected.
 * Typically used with tab panels, listbox options, and grid cells.
 *
 * Usage (according to WAI-ARIA):
 * - true: The element is selected
 * - false: The element is not selected
 * - undefined: The element is not selectable
 * - Required for roles like tab, option, gridcell when selectable
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected
 * @see https://www.w3.org/TR/wai-aria-1.2/#aria-selected
 */
/**
 * Internally the value is normalized to the attribute string ('true' | 'false').
 * The empty string represents "not set", so the attribute is omitted entirely
 * for elements that are not selectable.
 */
export type AriaSelectedProp = Prop<'ariaSelected', boolean, 'true' | 'false' | ''>;
export const ariaSelectedProp = createPropDefinition<AriaSelectedProp>('ariaSelected', '', (value) => (normalizeBoolean(value) ? 'true' : 'false'));

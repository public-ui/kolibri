import type { SimpleProp } from './helpers/factory';
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
export type AriaSelectedProp = SimpleProp<'ariaSelected', boolean>;
export const ariaSelectedProp = createPropDefinition<AriaSelectedProp>('ariaSelected', false, normalizeBoolean);

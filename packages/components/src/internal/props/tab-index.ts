import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeInteger } from './helpers/normalizers';

/**
 * Tab Index prop
 *
 * Defines which tab-index the primary element of the component has.
 * Default of 0 makes the element focusable in normal tab order.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
 */
export type TabIndexProp = SimpleProp<'tabIndex', number>;

export const tabIndexProp = createPropDefinition<TabIndexProp>('tabIndex', 0, normalizeInteger);

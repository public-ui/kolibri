import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

/**
 * Aria Expanded prop
 *
 * Marks this element as open/expanded, or that the connected element (aria-controls/aria-owns) is open/expanded.
 * Uses a string internal representation where '' = not set, 'true' = expanded, 'false' = collapsed.
 * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded
 */
export type AriaExpandedProp = Prop<'ariaExpanded', boolean | undefined, string>;

export const ariaExpandedProp = createPropDefinition<AriaExpandedProp>('ariaExpanded', '', (value: unknown): string => {
	if (value === true || value === 'true') return 'true';
	if (value === false || value === 'false') return 'false';
	return '';
});

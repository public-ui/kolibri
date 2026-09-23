import type { TabBehaviorPropType } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { isEnumOption, normalizeString } from './helpers/normalizers';

const tabBehaviorOptions: readonly TabBehaviorPropType[] = ['select-automatic', 'select-manual'];

/**
 * Keyboard behavior of a tab list.
 *
 * - `select-automatic`: arrow keys move the focus and activate the focused tab at once.
 * - `select-manual`: arrow keys only move the focus; Enter or Space activates the tab.
 *
 * Default: `select-automatic` — the behavior the predecessor applied whenever `_behavior` was
 * unset (it only checked for `select-manual`).
 *
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
 */
export type TabBehaviorProp = SimpleProp<'behavior', TabBehaviorPropType>;

export const tabBehaviorProp = createPropDefinition<TabBehaviorProp>(
	'behavior',
	'select-automatic',
	(value) => normalizeString(value) as TabBehaviorPropType,
	(v) => isEnumOption(v, tabBehaviorOptions),
);

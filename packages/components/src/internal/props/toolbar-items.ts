import type { ToolbarItemsPropType } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeArray } from './helpers/normalizers';

/**
 * Toolbar items prop.
 *
 * Accepts the item array or its JSON string. Item validation mirrors the legacy
 * `validateToolbarItems` predicate: every entry must be a non-null object. One invalid entry
 * rejects the whole value, keeping the previously rendered items — same as the predecessor.
 */
export type ToolbarItemsProp = SimpleProp<'items', ToolbarItemsPropType>;

export const toolbarItemsProp = createPropDefinition<ToolbarItemsProp>(
	'items',
	[],
	(value) => normalizeArray(value) as ToolbarItemsPropType,
	(items) => items.every((item) => typeof item === 'object' && item !== null),
);

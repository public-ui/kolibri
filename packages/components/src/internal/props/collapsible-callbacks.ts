import type { CollapsibleCallbacksPropType } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createCallbacksPropDefinition } from './helpers/factory';

export type CollapsibleCallbacksProp = SimpleProp<'on', CollapsibleCallbacksPropType<boolean>>;

/**
 * Callbacks prop shared by `kol-accordion` and `kol-details` — both expose the same
 * `onClick`/`onToggle` pair on their heading toggle button.
 */
export const collapsibleCallbacksProp = createCallbacksPropDefinition<CollapsibleCallbacksPropType<boolean>>();

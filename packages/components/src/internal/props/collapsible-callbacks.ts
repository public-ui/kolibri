import type { CollapsibleCallbacksPropType } from '../../schema';
import { createCallbacksPropDefinition } from './helpers/factory';

/**
 * Callbacks prop shared by `kol-accordion` and `kol-details` — both expose the same
 * `onClick`/`onToggle` pair on their heading toggle button.
 */
export const collapsibleCallbacksProp = createCallbacksPropDefinition<CollapsibleCallbacksPropType<boolean>>();

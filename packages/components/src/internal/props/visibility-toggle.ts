import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

/**
 * Visibility toggle prop of the password input
 *
 * Description:
 * Shows a button that switches the password between hidden and visible.
 */
export type VisibilityToggleProp = SimpleProp<'visibilityToggle', boolean>;
export const visibilityToggleProp = createPropDefinition<VisibilityToggleProp>('visibilityToggle', false, normalizeBoolean);

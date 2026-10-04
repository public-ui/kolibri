import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

/**
 * Whether a navigation renders a button below it that toggles its compact view (kol-nav).
 */
export type HasCompactButtonProp = SimpleProp<'hasCompactButton', boolean>;
export const hasCompactButtonProp = createPropDefinition<HasCompactButtonProp>('hasCompactButton', false, normalizeBoolean);

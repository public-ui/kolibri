import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

/**
 * Whether a component shows its settings menu (e.g. the column settings of a table).
 */
export type HasSettingsMenuProp = SimpleProp<'hasSettingsMenu', boolean>;
export const hasSettingsMenuProp = createPropDefinition<HasSettingsMenuProp>('hasSettingsMenu', false, normalizeBoolean);

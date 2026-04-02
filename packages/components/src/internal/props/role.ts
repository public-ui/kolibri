import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Role prop
 *
 * Defines the ARIA role of the component's primary element.
 * Used to override the implicit semantic role with an alternative role.
 */
export type RoleProp = SimpleProp<'role', string>;

export const roleProp = createPropDefinition<RoleProp>('role', '', normalizeString);

import { createPropDefinition, type Prop } from './helpers/factory';
import { normalizeInteger } from './helpers/normalizers';

/**
 * Count-Prop mit unterschiedlichen externen und internen Typen.
 * - Extern (Web Component): number | string (Shorthand erlaubt)
 * - Intern (Controller/FC): number
 */
export type CountProp = Prop<number | string, number, 'count'>;
export const countProp = createPropDefinition<number | string, number>(normalizeInteger, (v) => v >= 0);

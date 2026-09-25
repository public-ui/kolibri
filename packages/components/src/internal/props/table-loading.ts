import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

/**
 * Whether a table shows its loading spinner.
 *
 * Shares the key `loading` with `loadingProp`, which is the unrelated lazy-loading hint of embedded
 * content (`'eager' | 'lazy'`) — hence a definition of its own.
 */
export type TableLoadingProp = SimpleProp<'loading', boolean>;
export const tableLoadingProp = createPropDefinition<TableLoadingProp>('loading', false, normalizeBoolean);

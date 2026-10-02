import { createPropDefinition } from './helpers/factory';
import type { RowsProp } from './rows';

/**
 * `_rows` of `kol-single-select`: the number of visible options. The value reaches the CSS custom
 * property `--visible-options` as it is; without a value the list shows five options.
 */
export const singleSelectRowsProp = createPropDefinition<RowsProp>('rows', undefined as unknown as number, (value) => value as number);

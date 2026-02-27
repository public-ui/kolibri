import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type LoadingProp = SimpleProp<'loading', string>;
export const loadingProp = createPropDefinition<LoadingProp>(normalizeString, (v) => v === 'eager' || v === 'lazy');

import { createPropDefinition, type Prop } from './helpers/factory';
import { normalizeInteger } from './helpers/normalizers';

export type CountProp = Prop<'count', number | string, number>;
export const countProp = createPropDefinition<CountProp>(normalizeInteger, (v) => v >= 0);

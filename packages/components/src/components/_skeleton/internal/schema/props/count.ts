import { createPropDefinition, type Prop } from './helpers/factory';
import { normalizeInteger, validateInteger } from './helpers/integer';

export type CountPropType = number;
export type CountProp = Prop<CountPropType, 'count'>;
export const countProp = createPropDefinition<CountProp>(normalizeInteger, validateInteger);

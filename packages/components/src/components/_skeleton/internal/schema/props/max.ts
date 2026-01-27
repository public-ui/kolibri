import { createPropDefinition, type Prop } from './helpers/factory';
import { normalizeNumber, validateNumber } from './helpers/number';

export type MaxPropType = number;
export type MaxProp = Prop<MaxPropType, 'max'>;
export const maxProp = createPropDefinition<MaxProp>(normalizeNumber, validateNumber);

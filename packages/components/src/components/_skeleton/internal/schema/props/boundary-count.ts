import { createPropDefinition, type Prop } from './helpers/factory';
import { normalizeInteger, validateInteger } from './helpers/integer';

export type BoundaryCountPropType = number;
export type BoundaryCountProp = Prop<BoundaryCountPropType, 'boundaryCount'>;
export const boundaryCountProp = createPropDefinition<BoundaryCountProp>(normalizeInteger, validateInteger);

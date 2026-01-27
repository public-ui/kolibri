import { createPropDefinition, type Prop } from './helpers/factory';
import { normalizeNumber, validateNumber } from './helpers/number';

export type PageSizePropType = number;
export type PageSizeProp = Prop<PageSizePropType, 'pageSize'>;
export const pageSizeProp = createPropDefinition<PageSizeProp>(normalizeNumber, validateNumber);

import { createPropDefinition, type Prop } from './helpers/factory';
import { normalizeNumber, validateNumber } from './helpers/number';

export type PagePropType = number;
export type PageProp = Prop<PagePropType, 'page'>;
export const pageProp = createPropDefinition<PageProp>(normalizeNumber, validateNumber);

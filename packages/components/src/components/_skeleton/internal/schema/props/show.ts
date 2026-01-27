import { normalizeBoolean, validateBoolean } from './helpers/boolean';
import { createPropDefinition, type Prop } from './helpers/factory';

export type ShowPropType = boolean;
export type ShowProp = Prop<ShowPropType, 'show'>;
export const showProp = createPropDefinition<ShowProp>(normalizeBoolean, validateBoolean);

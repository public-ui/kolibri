import { normalizeBoolean } from './helpers/normalizers';
import { createPropDefinition, type Prop } from './helpers/factory';

export type ShowProp = Prop<boolean, 'show'>;
export const showProp = createPropDefinition<ShowProp>(normalizeBoolean, () => true);

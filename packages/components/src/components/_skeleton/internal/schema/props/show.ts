import { createPropDefinition, type Prop } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

export type ShowProp = Prop<boolean, 'show'>;
export const showProp = createPropDefinition<ShowProp>(normalizeBoolean, () => true);

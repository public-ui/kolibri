import { createPropDefinition, type Prop } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

export type ShowProp = Prop<'show', boolean>;
export const showProp = createPropDefinition<boolean>(normalizeBoolean, () => true);

import { createPropDefinition, type SimpleProp } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

export type ShowProp = SimpleProp<boolean, 'show'>;
export const showProp = createPropDefinition<boolean>(normalizeBoolean, () => true);

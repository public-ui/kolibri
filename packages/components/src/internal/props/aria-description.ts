import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type AriaDescriptionProp = SimpleProp<'ariaDescription', string>;
export const ariaDescriptionProp = createPropDefinition<AriaDescriptionProp>('ariaDescription', '', normalizeString);

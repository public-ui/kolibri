import type { AriaOwnsPropType } from '../../schema/props/aria-owns';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type AriaOwnsProp = SimpleProp<'ariaOwns', AriaOwnsPropType>;
export const ariaOwnsProp = createPropDefinition<AriaOwnsProp>('ariaOwns', '', normalizeString);

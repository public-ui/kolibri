import type { AriaControlsPropType } from '../../schema/props/aria-controls';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type AriaControlsProp = SimpleProp<'ariaControls', AriaControlsPropType>;
export const ariaControlsProp = createPropDefinition<AriaControlsProp>('ariaControls', '', normalizeString);

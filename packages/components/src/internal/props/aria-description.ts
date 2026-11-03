import type { AriaDescriptionPropType } from '../../schema/props/aria-description';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type AriaDescriptionProp = SimpleProp<'ariaDescription', AriaDescriptionPropType>;
export const ariaDescriptionProp = createPropDefinition<AriaDescriptionProp>('ariaDescription', '', normalizeString);

import type { ShortKeyPropType } from '../../schema/props/short-key';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type ShortKeyProp = SimpleProp<'shortKey', ShortKeyPropType>;
export const shortKeyProp = createPropDefinition<ShortKeyProp>('shortKey', '', normalizeString);

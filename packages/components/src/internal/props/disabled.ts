import type { DisabledPropType } from '../../schema/props/disabled';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

export type DisabledProp = SimpleProp<'disabled', DisabledPropType>;
export const disabledProp = createPropDefinition<DisabledProp>('disabled', false, normalizeBoolean);

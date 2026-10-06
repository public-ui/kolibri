import type { KoliBriImageEventCallbacks } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createCallbacksPropDefinition } from './helpers/factory';

export type ImageCallbacksProp = SimpleProp<'on', KoliBriImageEventCallbacks>;

export const imageCallbacksProp = createCallbacksPropDefinition<KoliBriImageEventCallbacks>();

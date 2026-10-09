import type { KoliBriCardEventCallbacks } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createCallbacksPropDefinition } from './helpers/factory';

export type CardCallbacksProp = SimpleProp<'on', KoliBriCardEventCallbacks>;

export const cardCallbacksProp = createCallbacksPropDefinition<KoliBriCardEventCallbacks>();

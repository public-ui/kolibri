import type { KoliBriCardEventCallbacks } from '../../schema';
import { createCallbacksPropDefinition } from './helpers/factory';

export const cardCallbacksProp = createCallbacksPropDefinition<KoliBriCardEventCallbacks>();

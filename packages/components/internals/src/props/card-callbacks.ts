import type { KoliBriCardEventCallbacks } from '../schema/index';
import { createCallbacksPropDefinition } from './helpers/factory';

export const cardCallbacksProp = createCallbacksPropDefinition<KoliBriCardEventCallbacks>();

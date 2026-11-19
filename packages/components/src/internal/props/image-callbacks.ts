import type { KoliBriImageEventCallbacks } from '../../schema';
import { createCallbacksPropDefinition } from './helpers/factory';

export const imageCallbacksProp = createCallbacksPropDefinition<KoliBriImageEventCallbacks>();

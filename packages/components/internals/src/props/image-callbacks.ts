import type { KoliBriImageEventCallbacks } from '../schema/index';
import { createCallbacksPropDefinition } from './helpers/factory';

export const imageCallbacksProp = createCallbacksPropDefinition<KoliBriImageEventCallbacks>();

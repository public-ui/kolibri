import type { KoliBriAlertEventCallbacks } from '../schema/index';
import { createCallbacksPropDefinition } from './helpers/factory';

export const alertCallbacksProp = createCallbacksPropDefinition<KoliBriAlertEventCallbacks>();

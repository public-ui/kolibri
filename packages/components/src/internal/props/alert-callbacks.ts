import type { KoliBriAlertEventCallbacks } from '../../schema';
import { createCallbacksPropDefinition } from './helpers/factory';

export const alertCallbacksProp = createCallbacksPropDefinition<KoliBriAlertEventCallbacks>();

import type { KoliBriAlertEventCallbacks } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createCallbacksPropDefinition } from './helpers/factory';

export type AlertCallbacksProp = SimpleProp<'on', KoliBriAlertEventCallbacks>;

export const alertCallbacksProp = createCallbacksPropDefinition<KoliBriAlertEventCallbacks>();

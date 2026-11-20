import type { KoliBriFormCallbacks } from '../schema/index';
import { createCallbacksPropDefinition } from './helpers/factory';

export const formCallbacksProp = createCallbacksPropDefinition<KoliBriFormCallbacks>();

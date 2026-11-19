import { hasCounterProp, maxLengthBehaviorProp, maxLengthProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const counterPropsConfig = {
	optional: [hasCounterProp, maxLengthProp, maxLengthBehaviorProp],
} as const satisfies PropsConfigShape;

export type CounterApi = ApiFromConfig<typeof counterPropsConfig>;

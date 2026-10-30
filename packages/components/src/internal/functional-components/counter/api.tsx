import { hasCounterProp } from '../../props/has-counter';
import { maxLengthProp } from '../../props/max-length';
import { maxLengthBehaviorProp } from '../../props/max-length-behavior';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const counterPropsConfig = {
	optional: [hasCounterProp, maxLengthProp, maxLengthBehaviorProp],
} as const satisfies PropsConfigShape;

export type CounterApi = ApiFromConfig<typeof counterPropsConfig>;

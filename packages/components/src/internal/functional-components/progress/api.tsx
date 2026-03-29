import { clampedNumberValueProp, labelProp, maxProp, unitProp, variantProgressProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const progressPropsConfig = {
	optional: [labelProp, unitProp, variantProgressProp],
	required: [maxProp, clampedNumberValueProp],
} as const satisfies PropsConfigShape;

export type ProgressApi = ApiFromConfig<typeof progressPropsConfig, { States: { liveValue: number } }>;

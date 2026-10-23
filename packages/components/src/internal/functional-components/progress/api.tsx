import { labelProp } from '../../props/label';
import { maxProp } from '../../props/max';
import { unitProp } from '../../props/unit';
import { clampedNumberValueProp } from '../../props/value-number-clamped';
import { variantProgressProp } from '../../props/variant-progress';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const progressPropsConfig = {
	optional: [labelProp, unitProp, variantProgressProp],
	required: [maxProp, clampedNumberValueProp],
} as const satisfies PropsConfigShape;

export type ProgressApi = ApiFromConfig<typeof progressPropsConfig, { States: { liveValue: number } }>;

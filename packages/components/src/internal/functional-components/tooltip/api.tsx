import { alignProp, badgeTextProp, labelProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const tooltipPropsConfig = {
	required: [labelProp],
	optional: [alignProp, badgeTextProp],
} as const satisfies PropsConfigShape;

export type TooltipApi = ApiFromConfig<typeof tooltipPropsConfig>;

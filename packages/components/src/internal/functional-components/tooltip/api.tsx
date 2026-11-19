import { alignProp, badgeTextProp, idProp, labelLangSegmentsProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const tooltipPropsConfig = {
	required: [labelLangSegmentsProp],
	optional: [alignProp, badgeTextProp, idProp],
} as const satisfies PropsConfigShape;

export type TooltipApi = ApiFromConfig<
	typeof tooltipPropsConfig,
	{
		Methods: {
			hideTooltip: () => void;
		};
	}
>;

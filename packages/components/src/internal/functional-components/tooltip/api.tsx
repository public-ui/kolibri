import { alignProp } from '../../props/align';
import { badgeTextProp } from '../../props/badge-text';
import { idProp } from '../../props/id';
import { labelProp } from '../../props/label';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const tooltipPropsConfig = {
	required: [labelProp],
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

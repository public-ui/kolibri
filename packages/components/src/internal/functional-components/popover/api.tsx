import { alignProp, showProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const popoverPropsConfig = {
	optional: [alignProp, showProp],
} as const satisfies PropsConfigShape;

export type PopoverApi = ApiFromConfig<
	typeof popoverPropsConfig,
	{
		States: { show: boolean; visible: boolean };
		Refs: { popoverElement: HTMLDivElement; arrowElement: HTMLDivElement };
	}
>;

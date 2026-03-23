import { alignProp, popoverCallbacksProp, showProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const popoverPropsConfig = {
	optional: [alignProp, showProp, popoverCallbacksProp],
} as const satisfies PropsConfigShape;

export type PopoverApi = ApiFromConfig<
	typeof popoverPropsConfig,
	{
		Refs: {
			popoverElement: HTMLDivElement;
			arrowElement: HTMLDivElement;
		};
		States: {
			visible: boolean;
			show: boolean;
		};
	}
>;

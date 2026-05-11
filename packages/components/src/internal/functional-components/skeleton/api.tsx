import type { FocusFunctionOptions } from '../../../schema';
import { nameProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const skeletonPropsConfig = {
	required: [nameProp],
} as const satisfies PropsConfigShape;

export type SkeletonApi = ApiFromConfig<
	typeof skeletonPropsConfig,
	{
		Callbacks: {
			click: () => void;
		};
		Emitters: {
			loaded: number;
			rendered: void;
		};
		Listeners: {
			keydown: KeyboardEvent;
		};
		Methods: {
			focus: (options?: FocusFunctionOptions) => void;
			toggle: () => void;
		};
		Refs: {
			button: HTMLButtonElement;
		};
		States: {
			count: number;
			label: string;
			show: boolean;
		};
	}
>;

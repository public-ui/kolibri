import type { FocusFunctionOptions } from '../../../schema';
import { labelProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const clickButtonPropsConfig = {
	required: [labelProp],
} as const satisfies PropsConfigShape;

export type ClickButtonApi = ApiFromConfig<
	typeof clickButtonPropsConfig,
	{
		Callbacks: {
			click: () => void;
		};
		Methods: {
			focus: (options?: FocusFunctionOptions) => void;
		};
		Refs: {
			button: HTMLButtonElement;
		};
	}
>;

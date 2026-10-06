import type { KolFocusOptions } from '../../../schema';
import { labelProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const treePropsConfig = {
	required: [labelProp],
} as const satisfies PropsConfigShape;

export type TreeApi = ApiFromConfig<
	typeof treePropsConfig,
	{
		Callbacks: {
			/**
			 * Bound to the default slot. `slotchange` is not composed, so it never reaches the host
			 * element: the web component has to listen on the slot itself to track the top-level items.
			 */
			slotchange: () => void;
		};
		Methods: {
			focus: (options?: KolFocusOptions) => void;
		};
	}
>;

import type { KolFocusOptions } from '../../../schema';
import { labelWithExpertSlotProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

/**
 * Props configuration for the tree component.
 *
 * `labelWithExpertSlotProp` (not `labelProp`): the label accepts any string; `labelProp` would
 * reject one-character labels.
 */
export const treePropsConfig = {
	required: [labelWithExpertSlotProp],
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

import type { KolFocusOptions } from '../../../schema';
import { labelProp } from '../../props/label';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

/**
 * Props configuration for the tree component.
 *
 * `labelProp`: the label is emitted only as the `aria-label` of the tree and is never rendered,
 * so language segments would have no effect — a plain string suffices.
 */
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

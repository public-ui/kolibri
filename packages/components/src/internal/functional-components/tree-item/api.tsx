import type { KolFocusOptions } from '../../../schema';
import { activeProp, hrefProp, labelWithExpertSlotProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

/**
 * Props configuration for the tree item component.
 *
 * Notes on prop choices:
 * - `labelWithExpertSlotProp` (not `labelProp`): the predecessor's `validateLabel` accepted any
 *   string; `labelProp` would reject one-character labels.
 * - `_open` is not a render prop: `expand()` and `collapse()` switch it from the inside, so the
 *   normalized value lives in the reactive `open` state (see `States`). The `_open` watcher still
 *   routes every external value through `openProp`.
 */
export const treeItemPropsConfig = {
	required: [hrefProp, labelWithExpertSlotProp],
	optional: [activeProp],
} as const satisfies PropsConfigShape;

export type TreeItemApi = ApiFromConfig<
	typeof treeItemPropsConfig,
	{
		Callbacks: {
			/**
			 * Click handler of the link's anchor. Implemented by the web component, which dispatches
			 * the `KolEvent.click` DOM event the transitional `kol-link-wc` used to dispatch.
			 */
			anchorClick: (event: Event) => void;
			/** Bound to the default slot, which holds the nested tree items. */
			slotchange: () => void;
			/** Bound to the chevron in front of the label: expands or collapses the item. */
			toggleClick: (event: MouseEvent) => void;
		};
		Methods: {
			collapse: () => void;
			expand: () => void;
			focus: (options?: KolFocusOptions) => void;
			isOpen: () => boolean;
		};
		Refs: {
			anchor: HTMLAnchorElement;
		};
		States: {
			/**
			 * Derived aria-current value of the link: `'page'` when the item's href matches the
			 * current location, otherwise an empty string (no attribute).
			 */
			ariaCurrent: string;
			/** DOM id of the child group, referenced by the link's `aria-owns`. Unique per instance. */
			groupId: string;
			/** Whether nested tree items are slotted in. Only then the item can be expanded. */
			hasChildren: boolean;
			/** Nesting depth below the enclosing `kol-tree` (0 for top-level items), used for indentation. */
			level: number;
			/** Whether the child group is expanded. Seeded from `_open`, switched by `expand()`/`collapse()`. */
			open: boolean;
		};
	}
>;

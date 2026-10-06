import type { KolFocusOptions } from '../../../schema';
import { labelProp, orientationProp, toolbarItemsProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';
import type { ToolbarButtonItem, ToolbarLinkItem } from './item';

/**
 * Props configuration for the toolbar component.
 *
 * Notes on prop choices:
 * - `orientationProp` defaults to `'horizontal'`, like the predecessor's `validateOrientation`.
 */
export const toolbarPropsConfig = {
	required: [labelProp, toolbarItemsProp],
	optional: [orientationProp],
} as const satisfies PropsConfigShape;

export type ToolbarApi = ApiFromConfig<
	typeof toolbarPropsConfig,
	{
		Methods: {
			click: () => void;
			focus: (options?: KolFocusOptions) => void;
		};
		States: {
			/**
			 * Index of the item carrying the roving tabindex. `-1` while no item is enabled.
			 */
			currentIndex: number;
			/**
			 * Orchestration records for the items (everything `ButtonFC` or `LinkFC` needs, built by
			 * `createToolbarItem`), rebuilt whenever `_items` changes.
			 */
			itemRecords: Array<ToolbarButtonItem | ToolbarLinkItem>;
			/**
			 * The current location reported by the aria-current service, `''` until one is reported.
			 * Drives the links' `aria-current`.
			 */
			location: string;
		};
	}
>;

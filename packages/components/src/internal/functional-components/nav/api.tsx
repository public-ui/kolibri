import { collapsibleProp, hasCompactButtonProp, hasIconsWhenExpandedProp, hideLabelProp, labelProp, navLinksProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';
import type { NavChildren } from './model';

export const navPropsConfig = {
	required: [labelProp, navLinksProp],
	optional: [collapsibleProp, hasCompactButtonProp, hasIconsWhenExpandedProp, hideLabelProp],
} as const satisfies PropsConfigShape;

export type NavApi = ApiFromConfig<
	typeof navPropsConfig,
	{
		Callbacks: {
			/** The compact button was clicked. */
			toggleCompact: () => void;
			/** An entry was clicked; its children expand or collapse. */
			toggleExpansion: (children?: NavChildren) => void;
		};
		States: {
			/** Whether the navigation shows the compact view. `_hideLabel` sets it, the compact button toggles it. */
			compact: boolean;
			/** The expanded children arrays, identified by identity. */
			expandedChildren: NavChildren[];
		};
	}
>;

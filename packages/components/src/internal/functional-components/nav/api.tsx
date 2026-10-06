import { collapsibleProp, hasCompactButtonProp, hasIconsWhenExpandedProp, hideLabelProp, labelWithExpertSlotProp, navLinksProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';
import type { NavChildren } from './model';

/**
 * Props configuration of `kol-nav`. `labelWithExpertSlotProp`, not `labelProp`: the label is the
 * `aria-label` of the navigation landmark, which has no length limit.
 */
export const navPropsConfig = {
	required: [labelWithExpertSlotProp, navLinksProp],
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

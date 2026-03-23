import { alignProp, showProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

/**
 * Popover Props Configuration
 *
 * External API props that users can set on the web component:
 * - align: alignment direction ('top', 'right', 'bottom', 'left')
 * - show: visibility control (external prop — user sets visibility)
 */
export const popoverPropsConfig = {
	optional: [alignProp, showProp],
} as const satisfies PropsConfigShape;

/**
 * PopoverApi Type Definition
 *
 * Refs:
 *   popoverElement: Reference to the div with popover="auto" attribute.
 *                   Used by the web component for positioning and API calls.
 *   arrowElement: Reference to the decorative arrow indicator element.
 *                 Used for positioning calculations relative to the popover.
 *
 * Note: visible is NOT a prop or state passed to PopoverFC.
 *       It is derived internally from the show prop for CSS class generation.
 */
export type PopoverApi = ApiFromConfig<
	typeof popoverPropsConfig,
	{
		Refs: {
			popoverElement: HTMLDivElement;
			arrowElement: HTMLDivElement;
		};
	}
>;

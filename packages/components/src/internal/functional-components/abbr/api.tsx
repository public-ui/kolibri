import { labelLangSegmentsProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const abbrPropsConfig = {
	optional: [labelLangSegmentsProp],
} as const satisfies PropsConfigShape;

export type AbbrApi = ApiFromConfig<
	typeof abbrPropsConfig,
	{
		Callbacks: {
			/**
			 * Bound to the default slot. `slotchange` is not composed, so it never reaches the host
			 * element: the web component has to listen on the slot itself to check the slotted content.
			 */
			slotchange: () => void;
		};
		Refs: {
			/** The abbreviation element; the anchor the tooltip behavior listens on. */
			abbr: HTMLElement;
			/** The default slot carrying the slotted short form. */
			slot: HTMLSlotElement;
		};
	}
>;

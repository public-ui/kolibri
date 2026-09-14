import type { KolFocusOptions } from '../../../schema';
import { colorProp, labelWithExpertSlotProp, smartButtonProp, spanIconsProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

/**
 * Props configuration for the badge component.
 *
 * Notes on prop choices:
 * - `labelWithExpertSlotProp` (not `labelProp`): the predecessor validated `_label` not at all and
 *   forwarded it straight to `SpanFC`, where the empty string enables the expert slot. `labelProp`
 *   would additionally reject labels shorter than two characters — a badge showing a single-digit
 *   counter must keep rendering.
 * - `spanIconsProp` (not `iconsProp`): icons are `KoliBriIconsProp` (a string or a per-direction
 *   object), not a plain icon class string.
 * - `smartButtonProp` is optional and deliberately has no meaningful default: the web component
 *   clears the render prop when no smart button is configured, so the functional component
 *   receives `undefined` and renders no button.
 */
export const badgePropsConfig = {
	required: [labelWithExpertSlotProp],
	optional: [colorProp, smartButtonProp, spanIconsProp],
} as const satisfies PropsConfigShape;

export type BadgeApi = ApiFromConfig<
	typeof badgePropsConfig,
	{
		Methods: {
			focus: (options?: KolFocusOptions) => void;
		};
		Refs: {
			smartButton: HTMLKolButtonWcElement;
		};
		States: {
			/**
			 * DOM id of the label span. Generated once per web component instance and referenced by
			 * the smart button's `aria-controls`, so it is only rendered when a smart button exists.
			 */
			labelId: string;
		};
	}
>;

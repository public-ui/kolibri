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
		/**
		 * The smart button is rendered by `ButtonFC`, so the badge owns the button's event handling:
		 * it forwards to the consumer's `_on` callbacks and dispatches the public DOM events on the
		 * badge host, which is what `kol-button-wc` did before.
		 */
		Callbacks: {
			blur: (event: FocusEvent) => void;
			click: (event: MouseEvent) => void;
			focus: (event: FocusEvent) => void;
			mouseDown: (event: MouseEvent) => void;
		};
		Methods: {
			focus: (options?: KolFocusOptions) => void;
		};
		Refs: {
			smartButton: HTMLButtonElement;
			tooltip: HTMLDivElement;
		};
		States: {
			/**
			 * DOM id of the visually-hidden span carrying the smart button's aria description.
			 * Generated once per instance, referenced by the button's `aria-describedby`.
			 */
			ariaDescriptionId: string;
			/**
			 * DOM id of the label span. Generated once per web component instance and referenced by
			 * the smart button's `aria-controls`, so it is only rendered when a smart button exists.
			 */
			labelId: string;
		};
	}
>;

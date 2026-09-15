import type { KolFocusOptions } from '../../../schema';
import { colorProp, labelWithExpertSlotProp, smartButtonProp, spanIconsProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

/**
 * Props configuration for the badge component.
 *
 * Why these prop definitions:
 * - `labelWithExpertSlotProp`, not `labelProp`: `labelProp` rejects labels shorter than two
 *   characters, and a badge showing a single-digit counter has to keep rendering. The empty
 *   string enables the expert slot.
 * - `spanIconsProp`, not `iconsProp`: icons are `KoliBriIconsProp` — a string or a per-direction
 *   object, not a plain icon class string.
 * - `smartButtonProp` has no meaningful default: the web component clears the render prop when no
 *   smart button is configured, so the functional component receives `undefined` and renders none.
 */
export const badgePropsConfig = {
	required: [labelWithExpertSlotProp],
	optional: [colorProp, smartButtonProp, spanIconsProp],
} as const satisfies PropsConfigShape;

export type BadgeApi = ApiFromConfig<
	typeof badgePropsConfig,
	{
		/**
		 * The badge owns the smart button's event handling: it forwards to the consumer's `_on`
		 * callbacks and dispatches the public DOM events on the badge host.
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

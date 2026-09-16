import type { KolFocusOptions } from '../../../schema';
import {
	accessKeyProp,
	ariaDescriptionProp,
	buttonCallbacksProp,
	buttonTypeProp,
	customClassProp,
	disabledProp,
	hideLabelProp,
	idProp,
	inlineProp,
	labelWithExpertSlotProp,
	popoverAlignProp,
	shortKeyProp,
	spanIconsProp,
	tabIndexProp,
	tooltipAlignProp,
	variantProp,
} from '../../props';
import type { ApiFromConfig, PropsConfigShape, WebComponentInterface } from '../generic-types';

/**
 * Props configuration for the popover button.
 *
 * The popover button renders `ButtonFC` plus a `PopoverFC`, so it needs every button prop plus
 * `_popoverAlign`. `_ariaControls`, `_ariaExpanded` and `_ariaHasPopup` are derived from the
 * popover state, not from external props, so they are absent here: the WC feeds them to `ButtonFC`
 * from its own popover state instead of from a prop watcher.
 *
 * `buttonCallbacksProp` is required by the config type system, but the popover button reserves
 * the button `onClick` for toggling the popover (see the WC), so the consumer's `_on` is not part
 * of the public behaviour. It stays a prop for API parity with the predecessor.
 */
export const popoverButtonPropsConfig = {
	required: [labelWithExpertSlotProp],
	optional: [
		accessKeyProp,
		ariaDescriptionProp,
		buttonCallbacksProp,
		buttonTypeProp,
		customClassProp,
		disabledProp,
		hideLabelProp,
		idProp,
		inlineProp,
		popoverAlignProp,
		shortKeyProp,
		spanIconsProp,
		tabIndexProp,
		tooltipAlignProp,
		variantProp,
	],
} as const satisfies PropsConfigShape;

export type PopoverButtonApi = ApiFromConfig<
	typeof popoverButtonPropsConfig,
	{
		Callbacks: {
			/** Blur handler bound to the button element. Implemented by the web component. */
			blur: (event: FocusEvent) => void;
			/** Click handler bound to the button element. Toggles the popover. */
			click: (event: MouseEvent) => void;
			/** Focus handler bound to the button element. Implemented by the web component. */
			focus: (event: FocusEvent) => void;
			/** Mousedown handler bound to the button element. Implemented by the web component. */
			mouseDown: (event: MouseEvent) => void;
		};
		Methods: {
			click: () => void;
			focus: (options?: KolFocusOptions) => void;
		};
		Refs: {
			button: HTMLButtonElement;
			tooltip: HTMLDivElement;
		};
		States: {
			/** DOM id of the visually-hidden span that carries the aria description. */
			ariaDescriptionId: string;
		};
	}
>;

/**
 * Web component interface for `kol-popover-button-wc`. The public `kol-popover-button` is a thin
 * `shadow: true` wrapper that forwards every prop to the `shadow: false` element below.
 */
export type PopoverButtonWebComponentInterface = WebComponentInterface<PopoverButtonApi>;

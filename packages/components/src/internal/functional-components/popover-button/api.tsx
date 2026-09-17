import {
	accessKeyProp,
	ariaDescriptionProp,
	ariaHasPopupProp,
	ariaSelectedProp,
	buttonCallbacksProp,
	buttonTypeProp,
	customClassProp,
	disabledProp,
	hideLabelProp,
	idProp,
	inlineProp,
	labelWithExpertSlotProp,
	linkRoleProp,
	nameProp,
	popoverAlignProp,
	shortKeyProp,
	spanIconsProp,
	tabIndexProp,
	tooltipAlignProp,
	variantProp,
} from '../../props';
import type { ApiFromConfig, PropsConfigShape, WebComponentInterface } from '../generic-types';

/**
 * Props configuration for the popover button component.
 *
 * `label` is the only required prop. All others are optional.
 *
 * Notes on prop choices:
 * - `buttonCallbacksProp`, `ariaHasPopupProp`, `ariaSelectedProp` and `linkRoleProp` are carried
 *   because `ButtonFC` requires the full button prop surface. The popover button never exposes
 *   them: the click callback is reserved for toggling the popover and the ARIA attributes are not
 *   rendered, so their store entries keep the `''` sentinel and the element watchers are omitted
 *   (same rationale as `ariaHasPopup` on `ButtonApi`).
 * - `ariaControls` and `ariaExpanded` are deliberately absent: the component renders them itself,
 *   pointing at the popover element and reflecting its open state.
 * - `_syncValueBySelector` and `_value` are deliberately absent: neither is rendered, and both are
 *   opaque pass-throughs to `AssociatedInputController` (inherited from `BaseButtonWebComponent`).
 *   They stay raw `@Prop`s on the web component, which forwards them from their watchers.
 */
export const popoverButtonPropsConfig = {
	required: [labelWithExpertSlotProp],
	optional: [
		accessKeyProp,
		ariaDescriptionProp,
		ariaHasPopupProp,
		ariaSelectedProp,
		buttonCallbacksProp,
		buttonTypeProp,
		customClassProp,
		disabledProp,
		hideLabelProp,
		idProp,
		inlineProp,
		labelWithExpertSlotProp,
		linkRoleProp,
		nameProp,
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
			/**
			 * Blur handler bound to the button element. Implemented by the web component, which also
			 * dispatches the custom `KolEvent.blur` event on the host element.
			 */
			blur: (event: FocusEvent) => void;
			/**
			 * Click handler bound to the button element. Implemented by the web component; toggles the
			 * popover and dispatches `KolEvent.click`. Not exposed as a consumer callback.
			 */
			click: (event: MouseEvent) => void;
			/**
			 * Focus handler bound to the button element. Implemented by the web component, which also
			 * dispatches the custom `KolEvent.focus` event on the host element.
			 */
			focus: (event: FocusEvent) => void;
			/**
			 * Mousedown handler bound to the button element. Implemented by the web component, which
			 * also dispatches the custom `KolEvent.mousedown` event on the host element.
			 */
			mouseDown: (event: MouseEvent) => void;
		};
		Refs: {
			button: HTMLButtonElement;
			popover: HTMLDivElement;
			tooltip: HTMLDivElement;
		};
		States: {
			/**
			 * DOM id of the visually-hidden span that carries the aria description, referenced by the
			 * button's aria-describedby attribute (aria-description lacks screen reader support).
			 */
			ariaDescriptionId: string;
			/**
			 * Whether the popover is currently open. Derived from the native popover `toggle` event,
			 * so class modifier and `aria-expanded` always match the real popover state.
			 */
			popoverOpen: boolean;
			/**
			 * DOM id of the popover element, referenced by the button's aria-controls attribute.
			 * Generated once per web component instance and never changed afterwards.
			 */
			popoverId: string;
		};
	}
>;

/**
 * Web component interface for the public `kol-popover-button`.
 *
 * `_id` is an internal prop that only the transitional `kol-popover-button-wc` exposes — legacy
 * consumers (`FormFieldLabel`, `SplitButton`) render that element inside their own shadow DOM.
 * `on` is never a consumer prop: its click callback is reserved for toggling the popover. Both
 * are part of `PopoverButtonApi` because both elements share one functional component, but their
 * watchers are omitted here instead of being declared as no-ops.
 */
export type PopoverButtonWebComponentInterface = Omit<
	WebComponentInterface<PopoverButtonApi>,
	'watchAriaHasPopup' | 'watchId' | 'watchOn' | 'watchRole' | 'watchAriaSelected'
>;

/**
 * Web component interface for the transitional `kol-popover-button-wc`: like the public element
 * it exposes `_id`, and like the public element it has no consumer `_on`.
 */
export type PopoverButtonWcWebComponentInterface = Omit<
	WebComponentInterface<PopoverButtonApi>,
	'watchAriaHasPopup' | 'watchOn' | 'watchRole' | 'watchAriaSelected'
>;

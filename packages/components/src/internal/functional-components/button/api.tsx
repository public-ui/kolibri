import type { KolFocusOptions } from '../../../schema';
import {
	accessKeyProp,
	ariaControlsProp,
	ariaDescriptionProp,
	ariaExpandedProp,
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
	optionalTabIndexProp,
	shortKeyProp,
	spanIconsProp,
	tooltipAlignProp,
	variantProp,
} from '../../props';
import type { ApiFromConfig, PropsConfigShape, WebComponentInterface } from '../generic-types';

/**
 * Props configuration for the button component.
 *
 * `label` is the only required prop. All others are optional.
 *
 * Notes on prop choices:
 * - `labelWithExpertSlotProp` (not `labelProp`): no min/max length restriction, matching the
 *   predecessor's `validateLabelWithExpertSlot`. The empty string enables the expert slot.
 * - `spanIconsProp` (not `iconsProp`): icons are `KoliBriIconsProp` (a string or a per-direction
 *   object), not a plain icon class string.
 * - `linkRoleProp`: the button shares the `'tab' | 'treeitem'` role union with the link
 *   (`AlternativeButtonLinkRolePropType`), so it reuses the same definition.
 * - `optionalTabIndexProp` (not `tabIndexProp`): a `<button>` is in the tab order without the
 *   attribute, so the default is "unset" rather than `0` — otherwise every button would render a
 *   stray `tabindex="0"`, and unsetting `_tabIndex` could not restore the unset state.
 * - `_syncValueBySelector` and `_value` are deliberately absent: neither is rendered, and both are
 *   opaque pass-throughs to `AssociatedInputController` (a CSS selector resolved against the
 *   document, and an arbitrary `StencilUnknown` payload). They stay raw `@Prop`s on the web
 *   component, which forwards them to the controller from their watchers.
 */
export const buttonPropsConfig = {
	required: [labelWithExpertSlotProp],
	optional: [
		accessKeyProp,
		ariaControlsProp,
		ariaDescriptionProp,
		ariaExpandedProp,
		ariaHasPopupProp,
		ariaSelectedProp,
		buttonCallbacksProp,
		buttonTypeProp,
		customClassProp,
		disabledProp,
		hideLabelProp,
		idProp,
		inlineProp,
		linkRoleProp,
		nameProp,
		optionalTabIndexProp,
		shortKeyProp,
		spanIconsProp,
		tooltipAlignProp,
		variantProp,
	],
} as const satisfies PropsConfigShape;

export type ButtonApi = ApiFromConfig<
	typeof buttonPropsConfig,
	{
		Callbacks: {
			/**
			 * Blur handler bound to the button element. Implemented by the web component, which
			 * also dispatches the custom `KolEvent.blur` event on the host element.
			 */
			blur: (event: FocusEvent) => void;
			/**
			 * Click handler bound to the button element. Implemented by the web component, which
			 * propagates submit/reset to the surrounding form and dispatches `KolEvent.click`.
			 */
			click: (event: MouseEvent) => void;
			/**
			 * Focus handler bound to the button element. Implemented by the web component, which
			 * also dispatches the custom `KolEvent.focus` event on the host element.
			 */
			focus: (event: FocusEvent) => void;
			/**
			 * Mousedown handler bound to the button element. Implemented by the web component,
			 * which also dispatches the custom `KolEvent.mousedown` event on the host element.
			 */
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
			/**
			 * DOM id of the visually-hidden span that carries the aria description. Generated once
			 * per web component instance and referenced by the button's aria-describedby attribute,
			 * since aria-description lacks screen reader support.
			 */
			ariaDescriptionId: string;
		};
	}
>;

/**
 * Web component interface for the public `kol-button`.
 *
 * `_ariaHasPopup`, `_id` and `_tabIndex` are internal props that only the transitional
 * `kol-button-wc` exposes — they are set by legacy consumers rendering that element inside their
 * own shadow DOM. They are part of `ButtonApi` because both elements share one functional
 * component, but they are not part of the public `kol-button` surface, so their watchers are
 * omitted here instead of being declared as no-ops.
 */
export type ButtonWebComponentInterface = Omit<WebComponentInterface<ButtonApi>, 'watchAriaHasPopup' | 'watchId' | 'watchTabIndex'>;

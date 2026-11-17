import {
	accessKeyProp,
	ariaControlsProp,
	ariaCurrentValueProp,
	ariaDescriptionProp,
	ariaExpandedProp,
	ariaOwnsProp,
	customClassProp,
	disabledProp,
	downloadProp,
	hideLabelProp,
	hrefProp,
	inlineProp,
	labelWithExpertSlotProp,
	linkCallbacksProp,
	linkRoleProp,
	linkTargetProp,
	shortKeyProp,
	spanIconsProp,
	tabIndexProp,
	tooltipAlignProp,
	variantProp,
} from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

/**
 * Props configuration for the link component.
 *
 * `href` is the only required prop. All others are optional.
 *
 * Notes on prop choices:
 * - `labelWithExpertSlotProp`: same validation as `labelProp` (at least 2 characters, numbers-only
 *   labels exempt) and its label hints; the empty string additionally enables the expert slot.
 * - `spanIconsProp` (not `iconsProp`): icons are `KoliBriIconsProp` (object), not a plain string.
 * - `tooltipAlignProp`: same valid values as `alignProp` but defaults to `'right'` (matching the
 *   legacy `_tooltipAlign` default).
 */
export const linkPropsConfig = {
	required: [hrefProp],
	optional: [
		accessKeyProp,
		ariaControlsProp,
		ariaCurrentValueProp,
		ariaDescriptionProp,
		ariaExpandedProp,
		ariaOwnsProp,
		customClassProp,
		disabledProp,
		downloadProp,
		hideLabelProp,
		spanIconsProp,
		inlineProp,
		labelWithExpertSlotProp,
		linkCallbacksProp,
		linkRoleProp,
		linkTargetProp,
		shortKeyProp,
		tabIndexProp,
		tooltipAlignProp,
		variantProp,
	],
} as const satisfies PropsConfigShape;

export type LinkApi = ApiFromConfig<
	typeof linkPropsConfig,
	{
		Callbacks: {
			/**
			 * Click handler bound to the anchor element. Implemented by the web component
			 * (`handleAnchorClick`), which also dispatches the custom `KolEvent.click` event
			 * on the host element.
			 */
			anchorClick: (event: Event) => void;
		};
		Methods: {
			focus: (options?: FocusOptions) => void;
			click: () => void;
		};
		Refs: {
			anchor: HTMLAnchorElement;
			tooltip: HTMLDivElement;
		};
		States: {
			/**
			 * Derived aria-current value: one of the aria-current tokens when the link's href
			 * matches the current location, otherwise an empty string (rendered as undefined →
			 * no aria-current attribute). Managed via setState for reactivity.
			 */
			ariaCurrent: string;
			/**
			 * DOM id of the visually-hidden span that carries the aria description. Generated
			 * once per web component instance and referenced by the anchor's aria-describedby
			 * attribute, since aria-description lacks screen reader support.
			 */
			ariaDescriptionId: string;
			/**
			 * Whether the expert slot should be rendered. True only when the consumer explicitly
			 * passed an empty-string label. When the label is undefined (default ''), the expert
			 * slot stays off and the href is used as the fallback label text.
			 */
			expertSlot: boolean;
		};
	}
>;

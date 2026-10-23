import { accessKeyProp } from '../../props/access-key';
import { ariaControlsProp } from '../../props/aria-controls';
import { ariaCurrentValueProp } from '../../props/aria-current-value';
import { ariaDescriptionProp } from '../../props/aria-description';
import { ariaExpandedProp } from '../../props/aria-expanded';
import { ariaOwnsProp } from '../../props/aria-owns';
import { customClassProp } from '../../props/custom-class';
import { disabledProp } from '../../props/disabled';
import { downloadProp } from '../../props/download';
import { hideLabelProp } from '../../props/hide-label';
import { hrefProp } from '../../props/href';
import { inlineProp } from '../../props/inline';
import { labelWithExpertSlotProp } from '../../props/label-with-expert-slot';
import { linkCallbacksProp } from '../../props/link-callbacks';
import { linkRoleProp } from '../../props/link-role';
import { linkTargetProp } from '../../props/link-target';
import { shortKeyProp } from '../../props/short-key';
import { spanIconsProp } from '../../props/span-icons';
import { tabIndexProp } from '../../props/tab-index';
import { tooltipAlignProp } from '../../props/tooltip-align';
import { variantProp } from '../../props/variant';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

/**
 * Props configuration for the link component.
 *
 * `href` is the only required prop. All others are optional.
 *
 * Notes on prop choices:
 * - `labelWithExpertSlotProp` (not `labelProp`): no min/max length restriction, matching the
 *   original `validateLabelWithExpertSlot`. The empty string enables the expert slot; this is
 *   tracked separately via the `expertSlot` state because the factory collapses undefined → ''
 *   (the default), which would wrongly enable the expert slot when no label was passed.
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

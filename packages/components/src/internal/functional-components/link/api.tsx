import {
	accessKeyProp,
	ariaControlsProp,
	ariaCurrentValueProp,
	ariaDescriptionProp,
	ariaExpandedProp,
	ariaOwnsProp,
	buttonVariantProp,
	customClassProp,
	disabledProp,
	downloadProp,
	hideLabelProp,
	hrefProp,
	inlineProp,
	linkCallbacksProp,
	linkLabelProp,
	linkRoleProp,
	shortKeyProp,
	spanIconsProp,
	tabIndexProp,
	targetProp,
	tooltipAlignProp,
	variantProp,
} from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

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
		linkLabelProp,
		linkCallbacksProp,
		linkRoleProp,
		shortKeyProp,
		tabIndexProp,
		targetProp,
		tooltipAlignProp,
		variantProp,
	],
} as const satisfies PropsConfigShape;

export type LinkApi = ApiFromConfig<
	typeof linkPropsConfig,
	{
		Methods: {
			focus: () => void;
			click: () => void;
		};
		Refs: {
			anchor: HTMLAnchorElement;
		};
		States: {
			ariaCurrent: string;
		};
	}
>;

/**
 * Props config for kol-link-button: a link that is styled as a button.
 * Differences to kol-link: the variant is the typed `ButtonVariant` enum
 * (matching the button presentation) instead of the free-form class name.
 */
export const linkButtonPropsConfig = {
	required: [hrefProp],
	optional: [
		accessKeyProp,
		ariaControlsProp,
		ariaCurrentValueProp,
		ariaDescriptionProp,
		ariaExpandedProp,
		ariaOwnsProp,
		buttonVariantProp,
		customClassProp,
		disabledProp,
		downloadProp,
		hideLabelProp,
		spanIconsProp,
		inlineProp,
		linkLabelProp,
		linkCallbacksProp,
		linkRoleProp,
		shortKeyProp,
		tabIndexProp,
		targetProp,
		tooltipAlignProp,
	],
} as const satisfies PropsConfigShape;

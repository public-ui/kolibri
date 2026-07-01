import { LinkProps } from '../../../schema';
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
import { LinkFCProps } from './component';

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

/**
 * Public API type for kol-link-button. Mirrors {@link LinkApi} but is derived
 * from {@link linkButtonPropsConfig}, so the `variant` render/prop type is the
 * typed `ButtonVariant` enum instead of the free-form link class name.
 */
export type LinkButtonApi = ApiFromConfig<
	typeof linkButtonPropsConfig,
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

export function matchLinkPropsToLinkFCProps(element: LinkProps): LinkFCProps {
	return {
		accessKey: element._accessKey,
		ariaControls: element._ariaControls,
		ariaCurrentValue: element._ariaCurrentValue,
		ariaDescription: element._ariaDescription,
		disabled: element._disabled,
		download: element._download,
		hideLabel: element._hideLabel,
		href: element._href,
		icons: element._icons,
		inline: element._inline,
		label: element._label,
		//on: element._on,
		role: element._role,
		shortKey: element._shortKey,
		target: element._target,
		tabIndex: element._tabIndex,
		tooltipAlign: element._tooltipAlign,
	} as LinkFCProps;
}

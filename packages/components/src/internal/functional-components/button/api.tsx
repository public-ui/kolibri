import type { KolFocusOptions, StencilUnknown } from '../../../schema';
import {
	accessKeyProp,
	alternativeButtonLinkRoleProp,
	ariaControlsProp,
	ariaDescriptionProp,
	ariaExpandedProp,
	ariaSelectedProp,
	buttonCallbacksProp,
	buttonInlineProp,
	buttonTooltipAlignProp,
	buttonTypeProp,
	buttonVariantProp,
	customClassProp,
	disabledProp,
	hideLabelProp,
	idProp,
	inlineProp,
	labelWithExpertSlotProp,
	nameProp,
	shortKeyProp,
	spanIconsProp,
	tabIndexProp,
	variantProp,
} from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const buttonPropsConfig = {
	required: [labelWithExpertSlotProp],
	optional: [
		accessKeyProp,
		alternativeButtonLinkRoleProp,
		ariaControlsProp,
		ariaDescriptionProp,
		ariaExpandedProp,
		ariaSelectedProp,
		buttonCallbacksProp,
		buttonTypeProp,
		buttonVariantProp,
		customClassProp,
		disabledProp,
		buttonInlineProp,
		hideLabelProp,
		idProp,
		nameProp,
		shortKeyProp,
		spanIconsProp,
		buttonTooltipAlignProp,
		tabIndexProp,
	],
} as const satisfies PropsConfigShape;

export type ButtonApi = ApiFromConfig<
	typeof buttonPropsConfig,
	{
		Methods: {
			click: () => void;
			focus: (options?: KolFocusOptions) => void;
			getValue: () => StencilUnknown;
		};
		Refs: {
			button: HTMLButtonElement;
			tooltipFloating: HTMLElement;
		};
		States: Record<never, never>;
	}
>;

/**
 * Props config for kol-button-link: a button that is styled as a link.
 * Differences to kol-button: no customClass/id/tabIndex in the public API and
 * the variant is a free-form class name instead of the ButtonVariant enum.
 */
export const buttonLinkPropsConfig = {
	required: [labelWithExpertSlotProp],
	optional: [
		accessKeyProp,
		alternativeButtonLinkRoleProp,
		ariaControlsProp,
		ariaDescriptionProp,
		ariaExpandedProp,
		ariaSelectedProp,
		buttonCallbacksProp,
		buttonTypeProp,
		disabledProp,
		hideLabelProp,
		inlineProp,
		nameProp,
		shortKeyProp,
		spanIconsProp,
		buttonTooltipAlignProp,
		variantProp,
	],
} as const satisfies PropsConfigShape;

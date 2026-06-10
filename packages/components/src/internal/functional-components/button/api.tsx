import type { KolFocusOptions, StencilUnknown } from '../../../schema';
import {
	accessKeyProp,
	alternativeButtonLinkRoleProp,
	ariaControlsProp,
	ariaDescriptionProp,
	ariaExpandedProp,
	ariaSelectedProp,
	buttonTypeProp,
	buttonVariantProp,
	customClassProp,
	disabledProp,
	hideLabelProp,
	iconsProp,
	idProp,
	inlineProp,
	labelWithExpertSlotProp,
	nameProp,
	shortKeyProp,
	tabIndexProp,
	tooltipAlignProp,
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
		buttonTypeProp,
		buttonVariantProp,
		customClassProp,
		disabledProp,
		hideLabelProp,
		iconsProp,
		idProp,
		inlineProp,
		nameProp,
		shortKeyProp,
		tabIndexProp,
		tooltipAlignProp,
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

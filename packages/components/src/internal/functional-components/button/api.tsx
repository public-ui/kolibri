import {
	accessKeyProp,
	alignProp,
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
} from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const buttonPropsConfig = {
	required: [labelWithExpertSlotProp],
	optional: [
		accessKeyProp,
		alignProp,
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
	],
} as const satisfies PropsConfigShape;

export type ButtonApi = ApiFromConfig<
	typeof buttonPropsConfig,
	{
		Callbacks: {
			click: (event: MouseEvent, value?: unknown) => void;
			mouseDown: (event: MouseEvent) => void;
		};
		Methods: {
			click: () => void;
			focus: () => void;
			getValue: () => unknown;
		};
		Refs: {
			button: HTMLButtonElement;
			tooltipFloating: HTMLElement;
		};
		States: Record<never, never>;
	}
>;

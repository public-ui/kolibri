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
	linkOnProp,
	roleProp,
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
		labelWithExpertSlotProp,
		linkOnProp,
		roleProp,
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
			focus: () => Promise<void>;
			click: () => Promise<void>;
		};
		Refs: {
			anchor: HTMLAnchorElement;
		};
		States: {
			ariaCurrent: string;
		};
	}
>;

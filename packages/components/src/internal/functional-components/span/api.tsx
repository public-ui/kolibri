import { allowMarkdownProp, badgeTextProp, hideLabelProp, labelLangSegmentsProp } from '../../../internal/props';
import { spanIconsProp } from '../../../internal/props/span-icons';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const spanPropsConfig = {
	required: [labelLangSegmentsProp],
	optional: [allowMarkdownProp, badgeTextProp, hideLabelProp, spanIconsProp],
} as const satisfies PropsConfigShape;

export type SpanApi = ApiFromConfig<typeof spanPropsConfig>;

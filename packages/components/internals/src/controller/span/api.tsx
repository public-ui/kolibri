import { allowMarkdownProp, badgeTextProp, hideLabelProp, labelLangSegmentsProp, spanIconsProp } from '../../props/index';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const spanPropsConfig = {
	required: [labelLangSegmentsProp],
	optional: [allowMarkdownProp, badgeTextProp, hideLabelProp, spanIconsProp],
} as const satisfies PropsConfigShape;

export type SpanApi = ApiFromConfig<typeof spanPropsConfig>;

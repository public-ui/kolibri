import { allowMarkdownProp, badgeTextProp, hideLabelProp } from '../../../internal/props';
import { labelProp } from '../../../internal/props/label';
import { spanIconsProp } from '../../../internal/props/span-icons';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const spanPropsConfig = {
	required: [labelProp],
	optional: [allowMarkdownProp, badgeTextProp, hideLabelProp, spanIconsProp],
} as const satisfies PropsConfigShape;

export type SpanApi = ApiFromConfig<typeof spanPropsConfig>;

import { allowMarkdownProp } from '../../../internal/props/allow-markdown';
import { badgeTextProp } from '../../../internal/props/badge-text';
import { hideLabelProp } from '../../../internal/props/hide-label';
import { labelLangSegmentsProp } from '../../../internal/props/label-lang-segment';
import { spanIconsProp } from '../../../internal/props/span-icons';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const spanPropsConfig = {
	required: [labelLangSegmentsProp],
	optional: [allowMarkdownProp, badgeTextProp, hideLabelProp, spanIconsProp],
} as const satisfies PropsConfigShape;

export type SpanApi = ApiFromConfig<typeof spanPropsConfig>;

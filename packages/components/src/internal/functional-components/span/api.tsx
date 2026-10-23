import { labelProp } from '../../../internal/props/label';
import { spanIconsProp } from '../../../internal/props/span-icons';
import { allowMarkdownProp } from '../../props/allow-markdown';
import { badgeTextProp } from '../../props/badge-text';
import { hideLabelProp } from '../../props/hide-label';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const spanPropsConfig = {
	required: [labelProp],
	optional: [allowMarkdownProp, badgeTextProp, hideLabelProp, spanIconsProp],
} as const satisfies PropsConfigShape;

export type SpanApi = ApiFromConfig<typeof spanPropsConfig>;

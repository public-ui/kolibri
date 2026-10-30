import { labelLangSegmentsProp } from '../../props/label-lang-segment';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const abbrPropsConfig = {
	optional: [labelLangSegmentsProp],
} as const satisfies PropsConfigShape;

export type AbbrApi = ApiFromConfig<typeof abbrPropsConfig>;

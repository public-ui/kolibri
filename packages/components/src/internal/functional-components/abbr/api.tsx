import { labelProp } from '../../props/label';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const abbrPropsConfig = {
	optional: [labelProp],
} as const satisfies PropsConfigShape;

export type AbbrApi = ApiFromConfig<typeof abbrPropsConfig>;

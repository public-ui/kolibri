import { abbrProp, labelProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const abbrPropsConfig = {
	optional: [abbrProp, labelProp],
} as const satisfies PropsConfigShape;

export type AbbrApi = ApiFromConfig<typeof abbrPropsConfig>;

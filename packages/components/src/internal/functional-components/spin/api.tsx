import { labelProp, showProp, variantSpinProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const spinPropsConfig = {
	optional: [labelProp, showProp, variantSpinProp],
} as const satisfies PropsConfigShape;

export type SpinApi = ApiFromConfig<typeof spinPropsConfig>;

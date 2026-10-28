import { optionalLabelProp, showProp, variantSpinProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const spinPropsConfig = {
	optional: [optionalLabelProp, showProp, variantSpinProp],
} as const satisfies PropsConfigShape;

export type SpinApi = ApiFromConfig<typeof spinPropsConfig>;

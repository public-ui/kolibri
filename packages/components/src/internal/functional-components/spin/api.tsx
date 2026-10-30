import { labelProp } from '../../props/label';
import { showProp } from '../../props/show';
import { variantSpinProp } from '../../props/variant-spin';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const spinPropsConfig = {
	optional: [labelProp, showProp, variantSpinProp],
} as const satisfies PropsConfigShape;

export type SpinApi = ApiFromConfig<typeof spinPropsConfig>;

import { altProp, imageCallbacksProp, loadingProp, sizesProp, srcProp, srcsetProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const imagePropsConfig = {
	optional: [imageCallbacksProp, loadingProp, sizesProp, srcsetProp],
	required: [altProp, srcProp],
} as const satisfies PropsConfigShape;

export type ImageApi = ApiFromConfig<typeof imagePropsConfig>;

import { altProp } from '../../props/alt';
import { imageCallbacksProp } from '../../props/image-callbacks';
import { loadingProp } from '../../props/loading';
import { sizesProp } from '../../props/sizes';
import { srcProp } from '../../props/src';
import { srcsetProp } from '../../props/srcset';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const imagePropsConfig = {
	optional: [imageCallbacksProp, loadingProp, sizesProp, srcsetProp],
	required: [altProp, srcProp],
} as const satisfies PropsConfigShape;

export type ImageApi = ApiFromConfig<typeof imagePropsConfig>;

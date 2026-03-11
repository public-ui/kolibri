import { iconsProp, labelProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const iconPropsConfig = {
	required: [iconsProp, labelProp],
} as const satisfies PropsConfigShape;

export type IconApi = ApiFromConfig<typeof iconPropsConfig>;

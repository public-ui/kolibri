import { iconsProp } from '../../props/icons';
import { labelProp } from '../../props/label';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const iconPropsConfig = {
	required: [iconsProp, labelProp],
} as const satisfies PropsConfigShape;

export type IconApi = ApiFromConfig<typeof iconPropsConfig>;

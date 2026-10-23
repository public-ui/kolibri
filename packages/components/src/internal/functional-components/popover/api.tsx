import { alignProp } from '../../props/align';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const popoverPropsConfig = {
	optional: [alignProp],
} as const satisfies PropsConfigShape;

export type PopoverApi = ApiFromConfig<typeof popoverPropsConfig>;

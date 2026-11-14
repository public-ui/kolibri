import { kolibriColorProp, labeledProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const kolibriPropsConfig = {
	optional: [kolibriColorProp, labeledProp],
} as const satisfies PropsConfigShape;

export type KolibriApi = ApiFromConfig<typeof kolibriPropsConfig>;

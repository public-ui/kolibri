import { labelProp, levelProp, secondaryHeadlineProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const headingPropsConfig = {
	optional: [levelProp, secondaryHeadlineProp],
	required: [labelProp],
} as const satisfies PropsConfigShape;

export type HeadingApi = ApiFromConfig<typeof headingPropsConfig>;

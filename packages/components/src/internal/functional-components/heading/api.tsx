import { labelWithExpertSlotProp, levelProp, secondaryHeadlineProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const headingPropsConfig = {
	optional: [levelProp, secondaryHeadlineProp],
	required: [labelWithExpertSlotProp],
} as const satisfies PropsConfigShape;

export type HeadingApi = ApiFromConfig<typeof headingPropsConfig>;

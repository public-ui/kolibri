import { labelWithExpertSlotProp } from '../../props/label-with-expert-slot';
import { levelProp } from '../../props/level';
import { secondaryHeadlineProp } from '../../props/secondary-headline';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const headingPropsConfig = {
	optional: [levelProp, secondaryHeadlineProp],
	required: [labelWithExpertSlotProp],
} as const satisfies PropsConfigShape;

export type HeadingApi = ApiFromConfig<typeof headingPropsConfig>;

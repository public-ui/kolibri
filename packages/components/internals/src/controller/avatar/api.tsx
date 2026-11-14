import { colorProp, labelProp, srcProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const avatarPropsConfig = {
	optional: [colorProp, srcProp],
	required: [labelProp],
} as const satisfies PropsConfigShape;

export type AvatarApi = ApiFromConfig<typeof avatarPropsConfig, { States: { initials: string } }>;

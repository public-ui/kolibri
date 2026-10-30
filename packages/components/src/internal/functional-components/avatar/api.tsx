import { colorProp } from '../../props/color';
import { labelProp } from '../../props/label';
import { srcProp } from '../../props/src';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const avatarPropsConfig = {
	optional: [colorProp, srcProp],
	required: [labelProp],
} as const satisfies PropsConfigShape;

export type AvatarApi = ApiFromConfig<typeof avatarPropsConfig, { States: { initials: string } }>;

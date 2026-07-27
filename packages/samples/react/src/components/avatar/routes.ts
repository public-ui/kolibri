import type { Routes } from '../../shares/types';
import { AvatarBasic } from './basic';
import { AvatarSize } from './size';

export const AVATAR_ROUTES: Routes = {
	avatar: {
		basic: AvatarBasic,
		size: AvatarSize,
	},
};

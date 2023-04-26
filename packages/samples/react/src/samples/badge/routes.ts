import { Routes } from '../../shares/types';

import { BadgeBasic } from './basic';

import { BadgeButton } from './button';

export const BADGE_ROUTES: Routes = {
	badge: {
		basic: BadgeBasic,
		button: BadgeButton,
	},
};

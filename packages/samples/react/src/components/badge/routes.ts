import type { Routes } from '../../shares/types';
import { BadgeBasic } from './basic';
import { BadgeButton } from './button';
import { FormattedLabel } from './formatted-label';

export const BADGE_ROUTES: Routes = {
	badge: {
		basic: BadgeBasic,
		button: BadgeButton,
		'formatted-label': FormattedLabel,
	},
};

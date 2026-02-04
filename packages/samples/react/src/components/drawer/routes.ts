import type { Routes } from '../../shares/types';
import { DrawerBasic } from './basic';
import { DrawerBigContent } from './big-content';
import { DrawerControlled } from './controlled';
import { DrawerScrolled } from './scrolled';

export const DRAWER_ROUTES: Routes = {
	drawer: {
		basic: DrawerBasic,
		controlled: DrawerControlled,
		scrolled: DrawerScrolled,
		'big-content': DrawerBigContent,
	},
};

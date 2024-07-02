import { Routes } from '../../shares/types';
import { DrawerBasic } from './basic';
import { DrawerControlled } from './controlled';

export const DRAWER_ROUTES: Routes = {
	drawer: {
		basic: DrawerBasic,
		controlled: DrawerControlled,
	},
};

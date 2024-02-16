import { Routes } from '../../shares/types';
import { TabsBasic } from './basic';
import { TabsIconsOnly } from './icons-only';

export const TABS_ROUTES: Routes = {
	tabs: {
		basic: TabsBasic,
		'icons-only': TabsIconsOnly,
	},
};

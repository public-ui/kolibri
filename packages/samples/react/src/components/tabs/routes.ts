import { Routes } from '../../shares/types';
import { TabsBasic } from './basic';
import { TabsIconsOnly } from './icons-only';
import { TabsBehaviorSelectManuel } from './behavior-select-manuel';

export const TABS_ROUTES: Routes = {
	tabs: {
		basic: TabsBasic,
		'icons-only': TabsIconsOnly,
		'behavior-select-manuel': TabsBehaviorSelectManuel,
		'behavior-select-manuel2': TabsBehaviorSelectManuel,
	},
};

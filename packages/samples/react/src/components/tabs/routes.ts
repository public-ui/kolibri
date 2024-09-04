import { Routes } from '../../shares/types';
import { TabsBasic } from './basic';
import { TabsIconsOnly } from './icons-only';
import { TabsBehaviorSelectManual } from './behavior-select-manual';

export const TABS_ROUTES: Routes = {
	tabs: {
		basic: TabsBasic,
		'icons-only': TabsIconsOnly,
		'behavior-select-manual': TabsBehaviorSelectManual,
	},
};

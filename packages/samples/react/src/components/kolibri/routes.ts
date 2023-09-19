import { Routes } from '../../shares/types';

import { KolibriBasic } from './basic';
import { KolibriAnimated } from './animated';
import { KolibriNoLabel } from './no-label';

export const KOLIBRI_ROUTES: Routes = {
	kolibri: {
		basic: KolibriBasic,
		animated: KolibriAnimated,
		'no-label': KolibriNoLabel,
	},
};

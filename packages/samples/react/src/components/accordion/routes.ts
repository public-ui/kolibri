import { Routes } from '../../shares/types';

import { AccordionBasic } from './basic';

import { AccordionHeadlines } from './headlines';

export const ACCORDION_ROUTES: Routes = {
	accordion: {
		basic: AccordionBasic,
		headlines: AccordionHeadlines,
	},
};

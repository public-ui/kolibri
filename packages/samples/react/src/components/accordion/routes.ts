import { Routes } from '../../shares/types';

import { AccordionBasic } from './basic';

import { AccordionHeader } from './header';

import { AccordionHeadlines } from './headlines';

export const ACCORDION_ROUTES: Routes = {
	accordion: {
		basic: AccordionBasic,
		header: AccordionHeader,
		headlines: AccordionHeadlines,
	},
};

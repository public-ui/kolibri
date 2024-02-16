import { Routes } from '../../shares/types';
import { AccordionBasic } from './basic';
import { AccordionHeadlines } from './headlines';
import { AccordionList } from './list';

export const ACCORDION_ROUTES: Routes = {
	accordion: {
		basic: AccordionBasic,
		headlines: AccordionHeadlines,
		list: AccordionList,
	},
};

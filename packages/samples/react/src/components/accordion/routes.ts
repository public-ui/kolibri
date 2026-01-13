import { Routes } from '../../shares/types';
import { AccordionBasic } from './basic';
import { AccordionHeadlines } from './headlines';
import { AccordionMultiple } from './multiple';

export const ACCORDION_ROUTES: Routes = {
	accordion: {
		basic: AccordionBasic,
		headlines: AccordionHeadlines,
		multiple: AccordionMultiple,
	},
};

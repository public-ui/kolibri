import type { Routes } from '../../shares/types';
import { AccordionBasic } from './basic';
import { AccordionComponentContent } from './component-content';
import { AccordionHeadlines } from './headlines';
import { AccordionMultiple } from './multiple';

export const ACCORDION_ROUTES: Routes = {
	accordion: {
		basic: AccordionBasic,
		headlines: AccordionHeadlines,
		multiple: AccordionMultiple,
		components: AccordionComponentContent,
	},
};

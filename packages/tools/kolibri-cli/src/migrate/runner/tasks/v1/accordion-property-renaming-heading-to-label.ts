import { ReplacePropertyNameTask } from '../common/ReplacePropertyNameTask';

export class AccordionPropertyRenamingHeadingToLabel extends ReplacePropertyNameTask {
	public static getInstance(): ReplacePropertyNameTask {
		return super.getInstance('accordion-property-renaming-heading-to-label', '>=1 <2', 'kol-accordion', '_heading', '_label');
	}
}

import { AbstractTask } from '../abstract-task';
import { AbbrPropertyRenamingTitleToLabel } from './v1/abbr-property-renaming-title-to-label';
import { AccordionPropertyRenamingHeadingToLabel } from './v1/accordion-property-renaming-heading-to-label';
import { TestVersionZero } from './v1/test-version-zero';

export const tasks: AbstractTask[] = [];
tasks.push(AbbrPropertyRenamingTitleToLabel.getInstance());
tasks.push(AccordionPropertyRenamingHeadingToLabel.getInstance());
tasks.push(TestVersionZero.getInstance());

import { AbstractTask } from '../../abstract-task';
import { AbbrPropertyRenamingTitleToLabel } from './abbr-property-renaming-title-to-label';
import { AccordionPropertyRenamingHeadingToLabel } from './accordion-property-renaming-heading-to-label';

export const v1Tasks: AbstractTask[] = [];
v1Tasks.push(AbbrPropertyRenamingTitleToLabel.getInstance());
v1Tasks.push(AccordionPropertyRenamingHeadingToLabel.getInstance());

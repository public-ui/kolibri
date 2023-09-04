import { AbstractTask } from '../abstract-task';
import { AbbrPropertyRenamingTitleToLabel } from './v1/abbr-property-renaming-title-to-label';
import { AccordionPropertyRenamingHeadingToLabel } from './v1/accordion-property-renaming-heading-to-label';
import { TestVersion12 } from './v1/test-version-1.2';
import { TestVersionNext2 } from './v1/test-version-next-2';
import { TestVersionNext3 } from './v1/test-version-next-3';
import { TestVersionZero } from './v1/test-version-zero';

export const tasks: AbstractTask[] = [];
tasks.push(AbbrPropertyRenamingTitleToLabel.getInstance());
tasks.push(AccordionPropertyRenamingHeadingToLabel.getInstance());
tasks.push(TestVersionZero.getInstance());
tasks.push(TestVersionNext2.getInstance());
tasks.push(TestVersionNext3.getInstance());
tasks.push(TestVersion12.getInstance());

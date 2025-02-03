import { AbstractTask } from '../../abstract-task';
import { CardRemovePropertyHasFooter } from './card';
import { LinkGroupRemovePropertyLevel } from './link-group';
import { RenameTagNameKolTableToKolTableStateful } from './table';

export const v2Tasks: AbstractTask[] = [];

v2Tasks.push(CardRemovePropertyHasFooter);
v2Tasks.push(LinkGroupRemovePropertyLevel);
v2Tasks.push(RenameTagNameKolTableToKolTableStateful);

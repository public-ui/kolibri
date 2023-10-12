import { AbstractTask } from '../../abstract-task';
import { CardRemovePropertyHasFooter } from './card';
import { LinkGroupRemovePropertyLevel } from './link-group';
import { NavRemovePropertyHasCompactButton } from './nav';

export const v2Tasks: AbstractTask[] = [];

v2Tasks.push(CardRemovePropertyHasFooter);
v2Tasks.push(LinkGroupRemovePropertyLevel);
v2Tasks.push(NavRemovePropertyHasCompactButton);

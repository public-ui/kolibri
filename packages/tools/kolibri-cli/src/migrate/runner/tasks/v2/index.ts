import * as cardTasks from './card';
import * as linkGroupTasks from './link-group';
import * as navTasks from './nav';
import { AbstractTask } from '../../abstract-task';

export const v2Tasks: AbstractTask[] = [...Object.values(cardTasks), ...Object.values(linkGroupTasks), ...Object.values(navTasks)];

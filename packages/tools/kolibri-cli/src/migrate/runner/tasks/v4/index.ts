import { AbstractTask } from '../../abstract-task';
import { RemoveIdPropTasks } from './id';

export const v4Tasks: AbstractTask[] = [];

v4Tasks.push(...RemoveIdPropTasks);

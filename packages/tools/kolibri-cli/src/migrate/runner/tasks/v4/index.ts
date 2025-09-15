import { AbstractTask } from '../../abstract-task';
import { RemoveIdPropTasks } from './id';
import { RemoveMsgPropsTasks } from './msg';

export const v4Tasks: AbstractTask[] = [];

v4Tasks.push(...RemoveIdPropTasks);
v4Tasks.push(...RemoveMsgPropsTasks);

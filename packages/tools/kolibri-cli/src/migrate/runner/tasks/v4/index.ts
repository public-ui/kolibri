import { AbstractTask } from '../../abstract-task';
import { HideErrorToHideMsgTasks } from './hide-msg';
import { RemoveIdPropTasks } from './id';
import { RemoveMsgPropsTasks } from './msg';
import { RemoveToastVariantTask } from './toast';
import { RemoveToasterGetInstanceOptionsTask } from './toaster';

export const v4Tasks: AbstractTask[] = [];

v4Tasks.push(...RemoveIdPropTasks);
v4Tasks.push(...HideErrorToHideMsgTasks);
v4Tasks.push(...RemoveMsgPropsTasks);
v4Tasks.push(RemoveToastVariantTask.getInstance('^4'));
v4Tasks.push(RemoveToasterGetInstanceOptionsTask.getInstance('^4'));

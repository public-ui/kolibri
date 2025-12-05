import { AbstractTask } from '../../abstract-task';
import { RemoveIdPropTasks } from './id';
import { MapVariantStandaloneToInlineTasks } from './link';
import { UpdateLoaderImportPathTask } from './loader';
import { RemoveMsgPropsTasks } from './msg';
import { NavRemovePropertyOrientationTask } from './nav';
import { RemoveToastVariantTask } from './toast';
import { RemoveToasterGetInstanceOptionsTask } from './toaster';

export const v4Tasks: AbstractTask[] = [];

v4Tasks.push(...MapVariantStandaloneToInlineTasks);
v4Tasks.push(NavRemovePropertyOrientationTask);
v4Tasks.push(...RemoveIdPropTasks);
v4Tasks.push(...RemoveMsgPropsTasks);
v4Tasks.push(RemoveToastVariantTask.getInstance('^4'));
v4Tasks.push(RemoveToasterGetInstanceOptionsTask.getInstance('^4'));
v4Tasks.push(UpdateLoaderImportPathTask.getInstance('^4'));

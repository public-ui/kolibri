import { AbstractTask } from '../../abstract-task';
import { MapVariantStandaloneToInlineTasks } from './link';
import { NavRemovePropertyOrientationTask } from './nav';
import { RemoveIdPropTasks } from './id';
import { RemoveMsgPropsTasks } from './msg';
import { RemoveToastVariantTask } from './toast';
import { RemoveToasterGetInstanceOptionsTask } from './toaster';
import { UpdateLoaderImportPathTask } from './loader';

export const v4Tasks: AbstractTask[] = [];

v4Tasks.push(...MapVariantStandaloneToInlineTasks);
v4Tasks.push(NavRemovePropertyOrientationTask);
v4Tasks.push(...RemoveIdPropTasks);
v4Tasks.push(...RemoveMsgPropsTasks);
v4Tasks.push(RemoveToastVariantTask.getInstance('^4'));
v4Tasks.push(RemoveToasterGetInstanceOptionsTask.getInstance('^4'));
v4Tasks.push(UpdateLoaderImportPathTask.getInstance('^4'));

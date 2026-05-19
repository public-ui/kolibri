import { AbstractTask } from '../../abstract-task';
import { RenameClearButtonPropTasks } from './clear-button';
import { RenameKolEventNamesTasks } from './events';
import { RenameKolFocusMethodsTask } from './focus';
import { RemoveIdPropTasks } from './id';
import { MapVariantStandaloneToInlineTasks } from './link';
import { UpdateLoaderImportPathTask } from './loader';
import { RenameTagNameKolModalToKolDialog } from './modal';
import { RemoveMsgPropsTasks } from './msg';
import { RenamePasswordVariantToVisibilityToggle } from './password-variant';
import { RemoveToastVariantTask } from './toast';
import { RemoveToasterGetInstanceOptionsTask } from './toaster';

export const v4Tasks: AbstractTask[] = [];

v4Tasks.push(...MapVariantStandaloneToInlineTasks);
v4Tasks.push(...RemoveIdPropTasks);
v4Tasks.push(...RemoveMsgPropsTasks);
v4Tasks.push(...RenameClearButtonPropTasks);
v4Tasks.push(RenameKolFocusMethodsTask.getInstance('^4'));
v4Tasks.push(RenameTagNameKolModalToKolDialog);
v4Tasks.push(...RenameKolEventNamesTasks);
v4Tasks.push(RemoveToastVariantTask.getInstance('^4'));
v4Tasks.push(RemoveToasterGetInstanceOptionsTask.getInstance('^4'));
v4Tasks.push(UpdateLoaderImportPathTask.getInstance('^4'));
v4Tasks.push(...RenamePasswordVariantToVisibilityToggle);

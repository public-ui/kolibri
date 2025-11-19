import { AbstractTask } from '../../abstract-task';
import { AbbrRemovePropertyTooltipAlign } from './abbr';
import { AllInputTasks } from './all-input';
import { InputFileRemovePropertyValue } from './input-file';
import { ModalRemovePropertyActiveElement } from './modal';
import { TextareaUpdatePropertyValue_Resize_Both, TextareaUpdatePropertyValue_Resize_Horizontal } from './textarea';
import { ToasterRenameProperties } from './toaster';

export const v3Tasks: AbstractTask[] = [];

v3Tasks.push(TextareaUpdatePropertyValue_Resize_Both);
v3Tasks.push(TextareaUpdatePropertyValue_Resize_Horizontal);
v3Tasks.push(AbbrRemovePropertyTooltipAlign);
v3Tasks.push(ModalRemovePropertyActiveElement);
v3Tasks.push(InputFileRemovePropertyValue);
v3Tasks.push(...AllInputTasks);
v3Tasks.push(ToasterRenameProperties);

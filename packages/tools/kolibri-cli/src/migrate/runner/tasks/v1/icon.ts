import { RemovePropertyNameTask } from '../common/RemovePropertyNameTask';
import { RenamePropertyNameTask } from '../common/RenamePropertyNameTask';

export const IconRenamePropertyAriaLabelToLabel = RenamePropertyNameTask.getInstance('kol-icon', '_aria-label', '_label', '>=1 <2');
export const IconRemovePropertyPart = RemovePropertyNameTask.getInstance('kol-icon', '_part', '>=1 <2');

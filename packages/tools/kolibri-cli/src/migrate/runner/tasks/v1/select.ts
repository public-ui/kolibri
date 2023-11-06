import { RenamePropertyNameTask } from '../common/RenamePropertyNameTask';
import { RemovePropertyNameTask } from '../common/RemovePropertyNameTask';

export const SelectRenamePropertyHeightToRows = RenamePropertyNameTask.getInstance('kol-select', '_height', '_rows', '^1');
export const SelectRenamePropertyListToOptions = RenamePropertyNameTask.getInstance('kol-select', '_list', '_options', '^1');
export const SelectRenamePropertyIconToIcons = RenamePropertyNameTask.getInstance('kol-select', '_icon', '_icons', '^1');
export const SelectRemovePropertySize = RemovePropertyNameTask.getInstance('kol-select', '_size', '^1');

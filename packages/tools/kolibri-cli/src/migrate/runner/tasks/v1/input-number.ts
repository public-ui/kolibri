import { RenamePropertyNameTask } from '../common/RenamePropertyNameTask';
import { RemovePropertyNameTask } from '../common/RemovePropertyNameTask';

export const InputNumberRenamePropertyListToSuggestions = RenamePropertyNameTask.getInstance('kol-input-number', '_list', '_suggestions', '^1');
// @todo export const InputNumberRemovePropertyType = RemovePropertyNameTask.getInstance('kol-input-number', '_type', '^1');
export const InputNumberRenamePropertyIconToIcons = RenamePropertyNameTask.getInstance('kol-input-number', '_icon', '_icons', '^1');
export const InputNumberRemovePropertyType = RemovePropertyNameTask.getInstance('kol-input-number', '_type', '^1');

import { RenamePropertyNameTask } from '../common/RenamePropertyNameTask';
import { RemovePropertyNameTask } from '../common/RemovePropertyNameTask';

export const InputEmailRenamePropertyListToSuggestions = RenamePropertyNameTask.getInstance('kol-input-email', '_list', '_suggestions', '^1');
export const InputEmailRenamePropertyIconToIcons = RenamePropertyNameTask.getInstance('kol-input-email', '_icon', '_icons', '^1');
export const InputEmailRemovePropertySize = RemovePropertyNameTask.getInstance('kol-input-email', '_size', '^1');

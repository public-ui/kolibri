import { RenamePropertyNameTask } from '../common/RenamePropertyNameTask';
import { RemovePropertyNameTask } from '../common/RemovePropertyNameTask';

export const InputTextRenamePropertyListToSuggestions = RenamePropertyNameTask.getInstance('kol-input-text', '_list', '_suggestions', '^1');
export const InputTextRenamePropertyIconToIcons = RenamePropertyNameTask.getInstance('kol-input-text', '_icon', '_icons', '^1');
export const InputTextRemovePropertySize = RemovePropertyNameTask.getInstance('kol-input-text', '_size', '^1');

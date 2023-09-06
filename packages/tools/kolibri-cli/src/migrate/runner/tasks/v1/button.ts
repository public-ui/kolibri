import { RemovePropertyNameTask } from '../common/RemovePropertyNameTask';
import { RenamePropertyNameTask } from '../common/RenamePropertyNameTask';

export const ButtonRemovePropertyAriaCurrent = RemovePropertyNameTask.getInstance('kol-button', '_aria-current', '^1');
export const ButtonRemovePropertyAriaLabel = RemovePropertyNameTask.getInstance('kol-button', '_aria-label', '^1');
// @todo: handle _icon-align in _icon
export const ButtonRemovePropertyIconAlign = RemovePropertyNameTask.getInstance('kol-button', '_icon-align', '^1');
export const ButtonRenamePropertyIconOnlyToHideLabel = RenamePropertyNameTask.getInstance('kol-button', '_icon-only', '_hide-label', '^1');

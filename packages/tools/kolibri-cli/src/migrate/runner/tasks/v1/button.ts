import { RemovePropertyNameTask } from '../common/RemovePropertyNameTask';
import { RenamePropertyNameTask } from '../common/RenamePropertyNameTask';
import { RefactorPropertyIconAlign } from '../common/RefactorPropertyIconAlign';

export const ButtonRemovePropertyAriaCurrent = RemovePropertyNameTask.getInstance('kol-button', '_aria-current', '^1');
export const ButtonRemovePropertyAriaLabel = RemovePropertyNameTask.getInstance('kol-button', '_aria-label', '^1');
export const ButtonRefactorPropertyIconAlign = RefactorPropertyIconAlign.getInstance('kol-button');
export const ButtonRenamePropertyIconOnlyToHideLabel = RenamePropertyNameTask.getInstance('kol-button', '_icon-only', '_hide-label', '^1');
export const ButtonRenamePropertyIconToIcons = RenamePropertyNameTask.getInstance('kol-button', '_icon', '_icons', '^1');

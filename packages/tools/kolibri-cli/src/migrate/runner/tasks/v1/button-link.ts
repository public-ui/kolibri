import { RemovePropertyNameTask } from '../common/RemovePropertyNameTask';
import { RenamePropertyNameTask } from '../common/RenamePropertyNameTask';

export const ButtonLinkRemovePropertyAriaCurrent = RemovePropertyNameTask.getInstance('kol-button-link', '_aria-current', '>=1 <2');
export const ButtonLinkRemovePropertyAriaLabel = RemovePropertyNameTask.getInstance('kol-button-link', '_aria-label', '>=1 <2');
export const ButtonLinkRenamePropertyIconOnlyToHideLabel = RenamePropertyNameTask.getInstance('kol-button-link', '_icon-only', '_hide-label', '>=1 <2');

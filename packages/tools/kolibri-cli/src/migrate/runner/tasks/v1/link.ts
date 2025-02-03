import { RemovePropertyNameTask } from '../common/RemovePropertyNameTask';
import { RenamePropertyNameTask } from '../common/RenamePropertyNameTask';
import { RefactorPropertyIconAlign } from '../common/RefactorPropertyIconAlign';

export const LinkRemovePropertyAriaControls = RemovePropertyNameTask.getInstance('kol-link', '_aria-controls', '^1');
export const LinkRenamePropertyAriaCurrentToListenAriaCurrent = RenamePropertyNameTask.getInstance('kol-link', '_aria-current', '_listen-aria-current', '^1');
export const LinkRemovePropertyAriaExpanded = RemovePropertyNameTask.getInstance('kol-link', '_aria-expanded', '^1');
export const LinkRemovePropertyAriaLabel = RemovePropertyNameTask.getInstance('kol-link', '_aria-label', '^1');
export const LinkRemovePropertyAriaSelected = RemovePropertyNameTask.getInstance('kol-link', '_aria-selected', '^1');
export const LinkRemovePropertyDisabled = RemovePropertyNameTask.getInstance('kol-link', '_disabled', '^1');
export const LinkRenamePropertyIconToIcons = RenamePropertyNameTask.getInstance('kol-link', '_icon', '_icons', '^1');
export const LinkRefactorPropertyIconAlign = RefactorPropertyIconAlign.getInstance('kol-link');
export const LinkRenamePropertyIconOnlyToHideLabel = RenamePropertyNameTask.getInstance('kol-link', '_icon-only', '_hide-label', '^1');
export const LinkRemovePropertySelector = RemovePropertyNameTask.getInstance('kol-link', '_selector', '^1');
export const LinkRemovePropertyStealth = RemovePropertyNameTask.getInstance('kol-link', '_stealth', '^1');
export const LinkRemovePropertyUseCase = RemovePropertyNameTask.getInstance('kol-link', '_use-case', '^1');

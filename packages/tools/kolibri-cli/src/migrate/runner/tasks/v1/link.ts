import { RemovePropertyNameTask } from '../common/RemovePropertyNameTask';
import { RenamePropertyNameTask } from '../common/RenamePropertyNameTask';

export const LinkRemovePropertyAriaControl = RemovePropertyNameTask.getInstance('kol-link', '_aria-control', '^1');
export const LinkRenamePropertyAriaCurrentToListenAriaCurrent = RenamePropertyNameTask.getInstance('kol-link', '_aria-current', '_listen-aria-current', '^1');
export const LinkRemovePropertyAriaExpanded = RemovePropertyNameTask.getInstance('kol-link', '_aria-expanded', '^1');
export const LinkRemovePropertyAriaLabel = RemovePropertyNameTask.getInstance('kol-link', '_aria-label', '^1');
export const LinkRemovePropertyAriaSelected = RemovePropertyNameTask.getInstance('kol-link', '_aria-selected', '^1');
export const LinkRemovePropertyDisabled = RemovePropertyNameTask.getInstance('kol-link', '_disabled', '^1');
// @todo: handle _icon-align in _icon
export const LinkRemovePropertyIconAlign = RemovePropertyNameTask.getInstance('kol-link', '_icon-align', '^1');
export const LinkRenamePropertyIconOnlyToHideLabel = RenamePropertyNameTask.getInstance('kol-link', '_icon-only', '_hide-label', '^1');
export const LinkRemovePropertySelector = RemovePropertyNameTask.getInstance('kol-link', '_selector', '^1');
export const LinkRemovePropertyStealth = RemovePropertyNameTask.getInstance('kol-link', '_stealth', '^1');
export const LinkRemovePropertyUseCase = RemovePropertyNameTask.getInstance('kol-link', '_use-case', '^1');

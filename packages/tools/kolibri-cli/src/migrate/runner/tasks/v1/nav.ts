import { RemovePropertyNameTask } from '../common/RemovePropertyNameTask';
import { RenamePropertyNameTask } from '../common/RenamePropertyNameTask';

export const NavRenamePropertyAriaLabelToLabel = RenamePropertyNameTask.getInstance('kol-nav', '_aria-label', '_label', '^1');
export const NavRenamePropertyCompactToHideLabel = RenamePropertyNameTask.getInstance('kol-nav', '_compact', '_hide-label', '^1');
export const NavRemovePropertyVariant = RemovePropertyNameTask.getInstance('kol-nav', '_variant', '^1');

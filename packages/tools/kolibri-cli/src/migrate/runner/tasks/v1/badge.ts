import { RemovePropertyNameTask } from '../common/RemovePropertyNameTask';
import { RenamePropertyNameTask } from '../common/RenamePropertyNameTask';

export const BadgeRemovePropertyIconOnly = RemovePropertyNameTask.getInstance('kol-badge', '_icon-only', '>=1 <2');
export const BadgeRenamePropertyIconOnlyToHideLabel = RenamePropertyNameTask.getInstance('kol-badge', '_icon-only', '_hide-label', '>=1 <2');
export const BadgeRemovePropertyHideLabel = RemovePropertyNameTask.getInstance('kol-badge', '_hide-label', '>=1 <2', [BadgeRenamePropertyIconOnlyToHideLabel]);

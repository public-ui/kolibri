import { RemovePropertyNameTask } from '../common/RemovePropertyNameTask';
import { RenamePropertyNameTask } from '../common/RenamePropertyNameTask';

export const BadgeRemovePropertyIconOnly = RemovePropertyNameTask.getInstance('kol-badge', '_icon-only', '^1');
export const BadgeRenamePropertyIconOnlyToHideLabel = RenamePropertyNameTask.getInstance('kol-badge', '_icon-only', '_hide-label', '^1');
export const BadgeRemovePropertyHideLabel = RemovePropertyNameTask.getInstance('kol-badge', '_hide-label', '^1', [BadgeRenamePropertyIconOnlyToHideLabel]);
export const BadgeRenamePropertyIconToIcons = RenamePropertyNameTask.getInstance('kol-badge', '_icon', '_icons', '^1');

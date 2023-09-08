import { RemovePropertyNameTask } from '../common/RemovePropertyNameTask';
import { RenamePropertyNameTask } from '../common/RenamePropertyNameTask';

export const LinkGroupRenamePropertyAriaLabelToLabel = RenamePropertyNameTask.getInstance('kol-link-group', '_aria-label', '_label', '^1');
export const LinkGroupRenamePropertyHeadingToLabel = RenamePropertyNameTask.getInstance('kol-link-group', '_heading', '_label', '^1');
export const LinkGroupRemovePropertyHeading = RemovePropertyNameTask.getInstance('kol-link-group', '_heading', '^1', [LinkGroupRenamePropertyHeadingToLabel]);
export const LinkGroupRemovePropertyOrdered = RemovePropertyNameTask.getInstance('kol-link-group', '_ordered', '^1');

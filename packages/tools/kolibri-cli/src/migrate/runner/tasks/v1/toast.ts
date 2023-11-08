import { RemovePropertyNameTask } from '../common/RemovePropertyNameTask';
import { RenamePropertyNameTask } from '../common/RenamePropertyNameTask';

export const ToastRemovePropertyNameShowDuration = RemovePropertyNameTask.getInstance('kol-toast', '_show-duration', '^1');
export const ToastRenamePropertyHeadingToLabel = RenamePropertyNameTask.getInstance('kol-toast', '_heading', '_label', '^1');

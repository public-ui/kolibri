import { AbstractTask } from '../../abstract-task';
import { RemovePropertyNameTask } from '../common/RemovePropertyNameTask';
import { RenamePropertyNameTask } from '../common/RenamePropertyNameTask';

const RenameHeaderCellsPropTask: AbstractTask = RenamePropertyNameTask.getInstance('kol-table-stateless', '_headerCells', '_headers', '^4');

const RemoveHeaderCellsPropTask: AbstractTask = RemovePropertyNameTask.getInstance('kol-table-stateless', '_headerCells', '^4', [RenameHeaderCellsPropTask]);

export const RenameTableStatelessHeaderCellsToHeaders: AbstractTask[] = [RenameHeaderCellsPropTask, RemoveHeaderCellsPropTask];

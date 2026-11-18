import { AbstractTask } from '../../abstract-task';
import { RemovePropertyNameTask } from '../common/RemovePropertyNameTask';
import { RenamePropertyNameTask } from '../common/RenamePropertyNameTask';

const RenameHeaderCellsPropTask: AbstractTask = RenamePropertyNameTask.getInstance('kol-table-stateless', '_header-cells', '_headers', '^5');

const RemoveHeaderCellsPropTask: AbstractTask = RemovePropertyNameTask.getInstance('kol-table-stateless', '_header-cells', '^5', [RenameHeaderCellsPropTask]);

export const RenameTableStatelessHeaderCellsToHeaders: AbstractTask[] = [RenameHeaderCellsPropTask, RemoveHeaderCellsPropTask];

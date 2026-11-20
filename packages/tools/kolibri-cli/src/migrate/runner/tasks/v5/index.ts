import { AbstractTask } from '../../abstract-task';
import { RenameTableStatelessHeaderCellsToHeaders } from './table-stateless-headers';
import { RemoveTagNameKolTooltipWc } from './tooltip';

export const v5Tasks: AbstractTask[] = [];

v5Tasks.push(RemoveTagNameKolTooltipWc);
v5Tasks.push(...RenameTableStatelessHeaderCellsToHeaders);

import { RenamePropertyNameTask } from '../common/RenamePropertyNameTask';

export const PaginationRenamePropertyCountToTotal = RenamePropertyNameTask.getInstance('kol-pagination', '_count', '_total', '^1');
export const PaginationRenamePropertyTotalToMax = RenamePropertyNameTask.getInstance('kol-pagination', '_total', '_max', '^1');

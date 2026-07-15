import { AbstractTask } from '../../abstract-task';
import { RemovePropertyNameTask } from '../common/RemovePropertyNameTask';

export const RemoveAbbrLabelPropTask: AbstractTask = RemovePropertyNameTask.getInstance('kol-abbr', '_label', '^4');
